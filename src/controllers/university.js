"use strict";

const UniversityModel = require("../models/univeristy");
const CourseModel = require("../models/course");


const list = (req, res) => {
    UniversityModel.find({}).populate('fieldsOfStudy').exec()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


const read = (req, res) => {
    UniversityModel.findById(req.params.id).exec()
        .then(university => {

            if (!university) return res.status(404).json({
                error: 'Not Found',
                message: `University not found`
            });

            res.status(200).json(university)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};


const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    UniversityModel.create(req.body)
        .then(university => res.status(201).json(university))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const update = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    UniversityModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).exec()
        .then(university => res.status(200).json(university))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

/**
 * Find all courses from university.
 * Author: Maria
 */
const getCoursesFromUniversity = (req, res) => {
    UniversityModel.findById(req.params.id).populate("fieldsOfStudy").exec()
        .then(university => {
            let allCourses = [];
            let numFieldOfStudy = university.fieldsOfStudy.length;
            for (let i = 0; i < numFieldOfStudy; i++) {
                let electiveCourses = university.fieldsOfStudy[i].elective;
                let mandatoryCourses = university.fieldsOfStudy[i].mandatory;
                allCourses.push(...electiveCourses);
                allCourses.push(...mandatoryCourses);
            }
            let unique = [...new Set(allCourses)];
            CourseModel.find({"_id": {$in: unique}}).exec()
                .then(courses => {
                    res.status(200).json(courses)
                })
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }));
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

/**
 * Find all fos from university.
 * Author: Maria
 */
const getFieldOfStudyFromUniversity = (req, res) => {
    const uniId = req.params.id;
    UniversityModel.findById(uniId).populate("fieldsOfStudy").exec()
        .then((uni) => res.status(200).json(uni.fieldsOfStudy))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
}
module.exports = {
    list,
    read,
    create,
    update,
    getCoursesFromUniversity,
    getFieldOfStudyFromUniversity
};