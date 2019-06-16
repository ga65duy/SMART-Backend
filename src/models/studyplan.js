"use strict";

const mongoose = require('mongoose');

const Studyplan = new mongoose.Schema({
    name: String

    /*courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: false
    }], */

});

module.exports = mongoose.model('Studyplan', Studyplan);