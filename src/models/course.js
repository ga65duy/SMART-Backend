"use strict";

/**
 * Model for courses
 * Author: Maria
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    SS: Boolean,
    WS: Boolean,
    description: String,
    area: [String],
    ects: Number,
    avgRatingOverall: Number,
    avgRatingLecturer: Number,
    avgRatingExam: Number,
    avgRatingContent: Number,
    ratings:[{
            type: Schema.Types.ObjectId,
            ref:'Rating'
    }],
});

module.exports = mongoose.model('Course', Course);