"use strict";
/**
 * Studyplan controllers for usecase: load studyplan and filter courses
 * Author: Maria /Gerhard
 */
const StudyplanModel = require("../models/studyplan");
const Course = require("../models/course");

const list  = (req, res) => {
    StudyplanModel.find({}).exec()
        .then(studyplan => res.status(200).json(studyplan))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
const read   = (req, res) => {
    StudyplanModel.findById(req.params.id).populate([{ path:'semester1', model:Course},{ path:'semester2', model:Course},{ path:'semester3', model:Course},{ path:'semester4', model:Course},{ path:'semester5', model:Course},{ path:'semester6', model:Course},{ path:'semester7', model:Course},{ path:'semester8', model:Course}]).exec()
        .then(studyplan => {

            if (!studyplan) return res.status(404).json({
                error: 'Not Found',
                message: `Studyplan not found`
            });

            res.status(200).json(studyplan)

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

    StudyplanModel.create(req.body)
        .then( studyplan=> res.status(201).json(studyplan))
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
    console.log(req.body);
    StudyplanModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true}).exec()
        .then(studyplan => res.status(200).json(studyplan))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = (req, res) => {
    StudyplanModel.findByIdAndRemove(req.params.id).exec()
        .then(studyplan =>
        res.status(200).json({message: `Studyplan with id ${studyplan.id} was deleted`}))
        .catch((error => res.status(500).json({
        error: 'Internal server error',
        message: error.message
    })))
};


module.exports = {
    list,
    read,
    create,
    update,
    remove
};