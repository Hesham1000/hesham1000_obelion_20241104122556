const express = require('express');
const router = express.Router();
const { createReview, getReviews, deleteReview } = require('../controllers/reviewController');

router.post('/reviews', createReview);
router.get('/reviews', getReviews);
router.delete('/reviews/:id', deleteReview);

module.exports = router;
