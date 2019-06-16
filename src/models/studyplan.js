"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Studyplan = new mongoose.Schema({
    name: String,

    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }],

});

module.exports = mongoose.model('Studyplan', Studyplan);