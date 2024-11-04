const express = require('express');
const SearchController = require('../controllers/searchController');
const router = express.Router();

router.get('/search/restaurants', SearchController.searchRestaurants);

module.exports = router;
