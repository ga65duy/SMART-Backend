"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const CourseController = require('../controllers/course');


router.get('/', CourseController.list);
router.get('/:id', CourseController.read); // Get a movie by Id


module.exports = router;