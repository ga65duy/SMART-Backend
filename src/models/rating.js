"use strict";
/**
 * Rating Model for the courses
 * Author: Maria
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    course:{
        type: Schema.Types.ObjectId,
        ref:'Course'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt: {
        type: String,
    }

});

module.exports = mongoose.model('Rating', Rating);
