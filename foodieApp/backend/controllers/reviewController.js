const { Review } = require('../models/Review');
const sequelize = require('../database/dbConnection');

async function createReview(req, res) {
  try {
    const { rating, reviewText } = req.body;
    const review = await Review.create({ rating, reviewText });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getReviews(req, res) {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteReview(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Review.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createReview,
  getReviews,
  deleteReview,
};
