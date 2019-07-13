"use strict";
/**
 * Controller for course
 * Defining CRUD operations for courses
 * Author: Gerhard and Maria
 */
const CourseModel = require("../models/course");
const RatingModel = require("../models/rating");
const UniversityUserModel = require("../models/universityUser");
const mongoose = require('mongoose');

const list = (req, res) => {
    CourseModel.find({}).populate({
        path: "ratings",
        populate: {
            path: "user",
            model: "User"
        }
    }).exec()
        .then(course => res.status(200).json(course))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read = (req, res) => {
    CourseModel.findById(req.params.id).populate({
        path: "ratings",
        populate: {
            path: "user",
            model: "User"
        }
    }).exec()
        .then(course => {

            if (!course) return res.status(404).json({
                error: 'Not Found',
                message: `Course not found`
            });

            res.status(200).json(course)

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

    CourseModel.create(req.body)
        .then(course => res.status(201).json(course))
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

    CourseModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).exec()
        .then(course => res.status(200).json(course))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const listCoursesWithRatingsOfUser = (req, res) => {
    RatingModel.find({user: req.params.id}).exec()
        .then(ratingsOfuser => {
            let courseIds = [];
            for (let i = 0; i < ratingsOfuser.length; i++) {
                courseIds.push(ratingsOfuser[i]["course"])
            }
            courseIds = courseIds.map(function (courseId) {
                return mongoose.Types.ObjectId(courseId)
            });
            CourseModel.find({
                "_id": {$in: courseIds}
            }).populate({
                path: "ratings",
                populate: {
                    path: "user",
                    model: "User"
                }
            }).exec().then(courses => {
                res.status(200).json(courses)
            }).catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const listUniUserCourses = (req, res) => {
    const uniUserId = req.params.id;
    UniversityUserModel.findById(uniUserId).populate("courses").exec()
        .then((Uniuser) => res.status(200).json(Uniuser.courses))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


module.exports = {
    list,
    listCoursesWithRatingsOfUser,
    listUniUserCourses,
    read,
    create,
    update
};