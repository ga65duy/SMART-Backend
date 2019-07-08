"use strict";
/**
 * Rating controller for usecase: rate course
 * Creates, Calculates, Lists and removes ratings
 * Author: Maria
 */
const RatingModel = require("../models/rating");
const CourseModel = require("../models/course");


function calculateAvgRatings(course) {
    let numberOfRatings = course.ratings.length;
    if (numberOfRatings === 0) {
        return {
            avgRatingOverall: 0,
            avgRatingLecturer: 0,
            avgRatingExam: 0,
            avgRatingContent: 0,
        };
    }
    let ratings = course.ratings;
    let sumOverallRating = 0;
    let sumLectureRating = 0;
    let sumContentRating = 0;
    let sumExamContentRating = 0;

    for (let i = 0; i < numberOfRatings; i++) {
        sumOverallRating += ratings[i].overallRating;
        sumLectureRating += ratings[i].lecturerRating;
        sumContentRating += ratings[i].contentRating;
        sumExamContentRating += ratings[i].examRating;
    }

    return {
        avgRatingOverall: sumOverallRating / numberOfRatings,
        avgRatingLecturer: sumLectureRating / numberOfRatings,
        avgRatingExam: sumExamContentRating / numberOfRatings,
        avgRatingContent: sumContentRating / numberOfRatings,
    };
}

const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    RatingModel.create(req.body)
        .then(rating => {
            let ratingId = rating._id;
            let courseId = rating.course;
            CourseModel.findByIdAndUpdate(courseId, {
                    "$push": {"ratings": ratingId}
                }, {
                    new: true,
                    runValidators: true
                }
            ).populate({
                path: 'ratings',
                model: 'Rating',
            })
                .exec().then((course) => {
                    let avgRatings = calculateAvgRatings(course);

                    CourseModel.findByIdAndUpdate(courseId, avgRatings, {
                        new: true,
                        runValidators: true
                    }).exec().then((course) => {
                            res.status(201).json(rating)
                        }
                    ).catch(error => {
                        res.status(500).json({
                            error: 'Internal server error',
                            message: error.message
                        })
                    })
                }
            )
        })
        .catch(error =>
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
};

const list = (req, res) => {
    RatingModel.find({}).populate("user").exec()
        .then(movies => res.status(200).json(movies))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = (req, res) => {
    console.log(req.params.id);
    RatingModel.findByIdAndRemove(req.params.id, req.body).exec()
        .then(rating => {
            console.log("First remove sucess")
            let ratingId = rating._id;
            let courseId = rating.course;
            CourseModel.findByIdAndUpdate(courseId, {
                    "$pull": {"ratings": ratingId}
                }, {
                    new: true,
                    runValidators: true
                }
            ).populate({
                path: 'ratings',
                model: 'Rating',
            })
                .exec().then((course) => {
                    console.log("Seccond remove sucess")
                    let avgRatings = calculateAvgRatings(course);

                    CourseModel.findByIdAndUpdate(courseId, avgRatings, {
                        new: true,
                        runValidators: true
                    }).exec().then((course) => {
                            console.log("Third remove sucess")
                            res.status(201).json(rating)
                        }
                    ).catch(error => {
                        console.log(error.message)
                        res.status(500).json({
                            error: 'Internal server error',
                            message: error.message
                        })
                    })
                }
            )
        })
        .catch((error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        })))
};

/*const update = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    console.log(req.params.id);
    RatingModel.findByIdAndUpdate(req.params.id, req.body).exec()
        .then((rating) => {
                        res.status(201).json(rating)}
                    ).catch(error => {
                        res.status(500).json({
                            error: 'Internal server error',
                            message: error.message
                        })})
        .catch((error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        })))
};*/


module.exports = {
    create,
    list,
    remove
};