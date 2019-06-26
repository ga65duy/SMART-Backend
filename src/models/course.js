"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true //<- no identical names
    },
    area: [String],
    ects: Number,
    avgRatingOverall: Number,
    avgRatingLecturer: Number,
    avgRatingExam:Number,
    avgRatingContent: Number

});

module.exports = mongoose.model('Course', Course);