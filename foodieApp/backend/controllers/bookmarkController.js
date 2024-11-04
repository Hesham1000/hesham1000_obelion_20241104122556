const Bookmark = require('../models/Bookmark');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('foodieApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

exports.getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll();
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addBookmark = async (req, res) => {
  const { restaurantName } = req.body;
  try {
    const newBookmark = await Bookmark.create({ restaurantName });
    res.status(201).json(newBookmark);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeBookmark = async (req, res) => {
  const { id } = req.params;
  try {
    const bookmark = await Bookmark.findByPk(id);
    if (bookmark) {
      await bookmark.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Bookmark not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
