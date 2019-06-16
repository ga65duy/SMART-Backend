"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new mongoose.Schema({
    name: String,
    area: [String],
    ects: Number,
    numberOfApplicants: Number,
    avgRating: Number,

});

module.exports = mongoose.model('Course', Course);