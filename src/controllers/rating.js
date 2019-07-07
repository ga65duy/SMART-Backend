"use strict";
/**
 * Rating controller for usecase: rate course
 * Author: Maria
 */
const RatingModel = require("../models/rating");
const CourseModel = require("../models/course");


const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    RatingModel.create(req.body)
        .then( rating =>
        {
            let ratingId = rating._id;
            let courseId = rating.course;
            CourseModel.findByIdAndUpdate(courseId,{
                "$push": {"ratings": ratingId}}, {
                 new: true,
                 runValidators: true}
         )
        .exec().then(() => res.status(201).json(rating))})
        .catch(error =>
            res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = (req, res) => {
    RatingModel.find({}).populate("user").exec()
        .then(movies => res.status(200).json(movies))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

module.exports = {
    create,
    list
};