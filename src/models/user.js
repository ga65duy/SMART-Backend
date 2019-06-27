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
        type:String

    },

    studplans: [{
        studyplan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Studyplan'
        }
}],
    courses:[{
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }

    }]

});

UserSchema.set('versionKey', false);

// Export the User model
module.exports = mongoose.model('User', UserSchema);