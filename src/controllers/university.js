"use strict";

const UniversityModel = require("../models/univeristy");

const list  = (req, res) => {
    UniversityModel.find({}).exec()  // .find({id:x,name:"f", $contains(synopsis:"asdj")}).exec()....
        .then(university => res.status(200).json(university))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
const read   = (req, res) => {
    UniversityModel.findById(req.params.id).exec()
        .then(university => {

            if (!university) return res.status(404).json({
                error: 'Not Found',
                message: `Studyplan not found`
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
        .then( university=> res.status(201).json(university))
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

    UniversityModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(university => res.status(200).json(university))
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