"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const StudyplanController = require('../controllers/studyplan');


router.get('/', StudyplanController.list);

module.exports = router;