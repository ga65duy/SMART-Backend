"use strict";


const mongoose = require('mongoose');

// Define the user schema

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true //<- no identical names
    },
    password: {
        type: String,
        required: true

    },
    studplans: [{
        studyplan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Studyplan'
        }
}]

});

UserSchema.set('versionKey', false);

// Export the User model
module.exports = mongoose.model('User', UserSchema);