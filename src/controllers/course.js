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


module.exports = {
    list
};