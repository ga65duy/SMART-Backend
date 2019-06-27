"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const FieldOfStudyController = require('../controllers/fieldOfStudy');


router.get('/', FieldOfStudyController.list);
router.get('/:id', FieldOfStudyController.read); // Get a movie by Id
router.post('/', middlewares.checkAuthentication, FieldOfStudyController.create); // Create a new movie
router.put('/:id', middlewares.checkAuthentication, FieldOfStudyController.update); // Update a movie by Id



module.exports = router;