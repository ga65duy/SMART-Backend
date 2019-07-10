"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    availableSS: Boolean,
    availableWS: Boolean,
    description: String,
    area: [String],
    ects: Number,
    avgRatingOverall: Number,
    avgRatingLecturer: Number,
    avgRatingExam:Number,
    avgRatingContent: Number,
    ratings:[{
            type: Schema.Types.ObjectId,
            ref:'Rating'
    }],
});

module.exports = mongoose.model('Course', Course);