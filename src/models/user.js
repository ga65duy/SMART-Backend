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
   /* studyplans:{
        type: studyplan
        TODO: nesting schemas

    }*/
});

UserSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('User', UserSchema);