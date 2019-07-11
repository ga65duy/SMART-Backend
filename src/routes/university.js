"use strict";

const express = require('express');
const router = express.Router();

const UniversityController = require('../controllers/university');


router.get('/', UniversityController.list);
router.get('/:id', UniversityController.read);
router.put('/:id', UniversityController.update);
router.post('/', UniversityController.create);
router.get('/:id/courses', UniversityController.getCoursesFromUniversity);

module.exports = router;