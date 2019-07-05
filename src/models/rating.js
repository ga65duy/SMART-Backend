"use strict";
/**
 * Rating Model for the courses
 * Author: Maria
 */

const mongoose = require('mongoose');
//TODO: add references (student, course)
const Rating = new mongoose.Schema({
    lecturerRating: {
        type: Number
    },
    contentRating: {
        type: Number
    },
    examRating: {
        type: Number
    },
    comment: {
        type: String
    },
    overallRating: {
        type: Number
    },
    title: {
        type:String
    }

});

module.exports = mongoose.model('Rating', Rating);
