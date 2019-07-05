"use strict";
/**
 * Rating controller for usecase: rate course
 * Author: Maria
 */
const RatingModel = require("../models/rating");


const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    RatingModel.create(req.body)
        .then( rating=> res.status(201).json(rating))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = (req, res) => {
    RatingModel.find({}).exec()
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