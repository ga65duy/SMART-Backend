"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const staticData = require('../staticData');

const FieldOfStudy = new mongoose.Schema({
    name: {
        //enum: staticData.fieldOfStudy
        type: String,
        unique: true,
        required:true
    },
    degree: {
        enum: staticData.degree,
    },
    validityPeriod: Date,
    mandatory: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true //wirklich required?
    }],
    elective: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: false
    }],

    recommendedSemester1: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    recommendedSemester2: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    recommendedSemester3: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    recommendedSemester4: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    recommendedSemester5: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    recommendedSemester6: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
});

module.exports = mongoose.model('FieldOfStudy', FieldOfStudy);