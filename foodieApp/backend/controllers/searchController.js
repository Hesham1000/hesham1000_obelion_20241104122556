const Restaurant = require('../models/Restaurant');

class SearchController {
  static async searchRestaurants(req, res) {
    try {
      const { location, cuisine } = req.query;
      const filters = {};

      if (location) {
        filters.address = { [Op.like]: `%${location}%` };
      }

      if (cuisine) {
        filters.cuisine = cuisine;
      }

      const restaurants = await Restaurant.findAll({ where: filters });

      return res.status(200).json(restaurants);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while searching for restaurants' });
    }
  }
}

module.exports = SearchController;
