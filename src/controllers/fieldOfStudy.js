"use strict";

const FieldOfStudyModel = require("../models/fieldOfStudy");
const CoursesModel = require("../models/course");

const list = (req, res) => {
    FieldOfStudyModel.find({}).exec()  // .find({id:x,name:"f", $contains(synopsis:"asdj")}).exec()....
        .then(fos => res.status(200).json(fos))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read = (req, res) => {
    FieldOfStudyModel.findById(req.params.id).populate('mandatory', 'elective').exec()
        .then(fos => {

            if (!fos) return res.status(404).json({
                error: 'Not Found',
                message: `Field of study not found`
            });

            res.status(200).json(fos)

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

    FieldOfStudyModel.create(req.body)
        .then(fos => res.status(201).json(fos))
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

    FieldOfStudyModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).exec()
        .then(fos => res.status(200).json(fos))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

/**
 * Find all courses from a fos
 * Author: Maria
 */
const uniqueCoursesOfFos = (req, res) => {
    const fosId = req.params.id;
    FieldOfStudyModel.findById(fosId).exec()
        .then((fos => {
            let allCourses = [];
            allCourses.push(...fos.elective);
            allCourses.push(...fos.mandatory);
            CoursesModel.find({
                "_id": {$in: allCourses}
            }).exec()
                .then((courses) => res.status(200).json(courses))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }))
        }))
};
module.exports = {
    list,
    read,
    create,
    update,
    uniqueCoursesOfFos
};