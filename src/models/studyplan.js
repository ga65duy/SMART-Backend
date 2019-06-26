"use strict";

const mongoose = require('mongoose');

const Studyplan = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },


    fieldOfStudy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FieldOfStudy'
    },
    semester1: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    semester2: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    semester3: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],


    semester4: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    semester5: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    semester6: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    semester7: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    semester8: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],


    /*courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],*/

});

module.exports = mongoose.model('Studyplan', Studyplan);