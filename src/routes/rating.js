/**
 * Rating route for usecase: rate course
 * Author: Maria
 */

const express  = require('express');
const router   = express.Router();

const RatingController = require('../controllers/rating');

router.post ('/', RatingController.create);
router.delete('/:id', RatingController.remove);
//router.put('/:id', RatingController.update);

module.exports = router;