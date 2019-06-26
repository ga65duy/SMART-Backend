"use strict";

const mongoose = require('mongoose');

const University = new mongoose.Schema({
    name: {
        type:String,
        unique:true,
        required:true
    },

   fieldsOfStudy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FieldOfStudy'
    }],


   //fieldsOfStudy:[ {type: String}]

});

module.exports = mongoose.model('University', University);