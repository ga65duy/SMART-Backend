"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const UniversityController = require('../controllers/university');


router.get('/', UniversityController.list);
router.get('/:id', UniversityController.read); // Get Studyplan by Id
router.put('/:id', UniversityController.update); //update studyplan by id
router.post ('/', UniversityController.create); //create studyplan


module.exports = router;