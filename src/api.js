"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middlewares');

const auth  = require('./routes/auth');
const movie = require('./routes/movie');
const course = require('./routes/course');
const studyplan = require('./routes/studyplan');
const university= require('./routes/university');

const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'This is the SMART Backend'
    });
});

// API routes
api.use('/auth'  , auth);
api.use('/movies', movie);
api.use('/course', course);
api.use('/studyplan', studyplan);
api.use('/university',university);


module.exports = api;