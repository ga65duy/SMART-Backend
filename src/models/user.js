"use strict";

const mongoose = require('mongoose');

// Define the user schema

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true //<- no identical names
    },

    isUniversityUser:{
        type:Boolean,
        required:true
    },

    password: {
        type: String,
        required: true

    },
    email: {
        type:String,
        required: true
    },
});
// Export the User model
module.exports = mongoose.model('User', UserSchema);