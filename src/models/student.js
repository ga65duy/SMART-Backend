"use strict";
/**
 * Model for the Student, that is a subclass from user
 *
 * Author: Maria
 */
const mongoose = require('mongoose');
const User = require("./user");

const Student = User.discriminator("Student", new mongoose.Schema({

studplans: [{
    studyplan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studyplan'
    }
}],
}));

module.exports = Student;

