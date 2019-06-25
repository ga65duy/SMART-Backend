"use strict";

const mongoose = require('mongoose');

const University = new mongoose.Schema({
    name: String,

    fieldsOfStudy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FieldOfStudy'
    }],

});

module.exports = mongoose.model('University', University);