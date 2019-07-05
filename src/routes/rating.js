/**
 * Rating route for usecase: rate course
 * Author: Maria
 */

const express  = require('express');
const router   = express.Router();

const RatingController = require('../controllers/rating');

router.post ('/', RatingController.create);

module.exports = router;