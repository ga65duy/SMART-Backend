"use strict";

/**
 * Model for university user, that is a subclass from user
 * Author: Maria
 */
const mongoose = require('mongoose');
const User = require("./user");
const Schema = mongoose.Schema;

const UniversityUser = User.discriminator("UniversityUser", new mongoose.Schema({
    university: {
        type : Schema.Types.ObjectId,
        ref: "University"
    },
    courses:[{
        course:{
            type: Schema.Types.ObjectId,
            ref:'Course'
        }

    }],
    faculty: String,
    chair: String,
    authorization: String,
}));

module.exports = UniversityUser;