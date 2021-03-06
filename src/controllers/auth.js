"use strict";

/**
 * AuthorizationController
 *
 * Used for Login,Register and change Profile
 * Author: Maria
 */
const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const config     = require('../config');
const UserModel  = require('../models/user');
const Student = require("../models/student");
const UniUser = require("../models/universityUser");


const login = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    UserModel.findOne({username: req.body.username}).exec()
        .then(user => {

            // check if the password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) return res.status(401).send({token: null });

            // if user is found and password is valid
            // create a token
            const token = jwt.sign({ id: user._id, username: user.username, isUniversityUser: user.isUniversityUser }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});

        })
        .catch(error => res.status(404).json({
            error: 'User Not Found',
            message: error.message
        }));

};

const validateUserProperties = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });
    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'isUniversityUser')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must be either Student or University property'
    });
};

const registerStudent = (req,res) => {

    validateUserProperties(req, res);

    const student = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});

    Student.create(student)
        .then(student => {
            const token = jwt.sign({ id: student._id, username: student.username, isUniversityUser: student.isUniversityUser,
            email:student.email, studyplans:student.studyplans}, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});
        })
        .catch(error => {
            console.log(error)
            if(error.code == 11000) {
                res.status(400).json({
                    error: 'User exists',
                    message: error.message
                })
            }
            else{
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });

};

const registerUniUser = (req,res) => {
    validateUserProperties(req,res);
    console.log("registering user")
    if (!Object.prototype.hasOwnProperty.call(req.body, 'university')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a university property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'faculty')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a faculty property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'chair')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a chair property'
    });

    const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});


    UniUser.create(user)
        .then(user => {
            const token = jwt.sign
            ({
                id: user._id, username: user.username, isUniversityUser: user.isUniversityUser,
                university: user.university, faculty: user.faculty, chair: user.chair}, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});
        })
        .catch(error => {
            if(error.code == 11000) {
                res.status(400).json({
                    error: 'User exists',
                    message: error.message
                })
            }
            else{
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });

};

const updateStudentUser = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    Student.findByIdAndUpdate(req.body._id, req.body,{
        new: true,
        runValidators: true}).exec()
        .then(user => {
            console.log("update successful")
            console.log(user)
            res.status(200).json(user)
        })
        .catch(error => {
            console.log("update unsuccessful")
            console.log(error)
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            })
        });
};

const updateUniUser = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    UniUser.findByIdAndUpdate(req.body._id, req.body,{
        new: true,
        runValidators: true}).exec()
        .then(user => {
            console.log("update sucessfull")
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            })
        });
};

const me = (req, res) => {
    UserModel.findById(req.userId).exec()
        .then(user => {
            if (user.isUniversityUser) {
                //TODO
            }
            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });
            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};


module.exports = {
    login,
    registerUniUser,
    registerStudent,
    logout,
    updateStudentUser,
    updateUniUser,
    me
};