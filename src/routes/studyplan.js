"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const StudyplanController = require('../controllers/studyplan');


router.get('/', StudyplanController.list);
router.get('/:id', StudyplanController.read); // Get Studyplan by Id



module.exports = router;