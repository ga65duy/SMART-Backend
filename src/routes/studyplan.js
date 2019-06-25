"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const StudyplanController = require('../controllers/studyplan');


router.get('/', StudyplanController.list);
router.get('/:id', StudyplanController.read); // Get Studyplan by Id
router.put('/:id', StudyplanController.update); //update studyplan by id
router.post ('/', StudyplanController.create); //create studyplan
router.delete('/:id',StudyplanController.remove); //delete studplan


module.exports = router;