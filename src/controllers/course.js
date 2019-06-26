"use strict";

const CourseModel = require("../models/course");

const list  = (req, res) => {
    CourseModel.find({}).exec()  // .find({id:x,name:"f", $contains(synopsis:"asdj")}).exec()....
        .then(course => res.status(200).json(course))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read   = (req, res) => {
    CourseModel.findById(req.params.id).exec()
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
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    CourseModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(course => res.status(200).json(course))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


module.exports = {
    list,
    read,
    create,
    update
};