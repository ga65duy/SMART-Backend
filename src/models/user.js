"use strict";

/**
 * Model for user. Representing the superclass from student and university user
 *Author: Maria
 */
const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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