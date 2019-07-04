"use strict";

/**
 * Router for authorization
 * Author: Maria
 */
const express = require('express');
const router = express.Router();

const middlewares    = require('../middlewares');
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.post('/registerUniversityUser', AuthController.registerUniUser);
router.post('/registerStudent', AuthController.registerStudent);
router.get('/me', middlewares.checkAuthentication , AuthController.me);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);
router.put('/updateProfile', AuthController.updateUser);

module.exports = router;