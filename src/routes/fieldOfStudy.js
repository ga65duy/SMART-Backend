"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const FieldOfStudyController = require('../controllers/fieldOfStudy');


router.get('/', FieldOfStudyController.list);
router.get('/:id', FieldOfStudyController.read);
router.post('/', middlewares.checkAuthentication, FieldOfStudyController.create);
router.put('/:id', middlewares.checkAuthentication, FieldOfStudyController.update);
router.get('/:id/courses', FieldOfStudyController.uniqueCoursesOfFos);

module.exports = router;