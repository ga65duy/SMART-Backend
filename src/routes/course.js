"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const CourseController = require('../controllers/course');


router.get('/', CourseController.list);
router.get('/:id', CourseController.read);
router.post('/', middlewares.checkAuthentication, CourseController.create);
router.put('/:id', middlewares.checkAuthentication, CourseController.update);
router.get('/ratings/user/:id', CourseController.listCoursesWithUserRating);



module.exports = router;