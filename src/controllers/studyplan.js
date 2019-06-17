"use strict";

const StudyplanModel = require("../models/studyplan");

const list  = (req, res) => {
    StudyplanModel.find({}).exec()  // .find({id:x,name:"f", $contains(synopsis:"asdj")}).exec()....
        .then(studyplan => res.status(200).json(studyplan))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
const read   = (req, res) => {
    StudyplanModel.findById(req.params.id).exec()
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


module.exports = {
    list,
    read
};