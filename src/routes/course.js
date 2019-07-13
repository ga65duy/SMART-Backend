"use strict";
/**
 * Router for courses
 * Author: Maria
 */

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const CourseController = require('../controllers/course');

router.get('/', CourseController.list);
router.get('/:id', CourseController.read);
router.post('/', middlewares.checkAuthentication, CourseController.create);
router.put('/:id', middlewares.checkAuthentication, CourseController.update);
router.get('/ratings/user/:id', CourseController.listCoursesWithRatingsOfUser);
router.get('/user/:id', CourseController.listUniUserCourses);

module.exports = router;