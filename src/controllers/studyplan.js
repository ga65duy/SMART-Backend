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


module.exports = {
    list
};