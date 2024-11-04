const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

// GET /bookmarks - Get all bookmarks
router.get('/bookmarks', bookmarkController.getAllBookmarks);

// POST /bookmarks - Add a new bookmark
router.post('/bookmarks', bookmarkController.addBookmark);

// DELETE /bookmarks/:id - Remove a bookmark by ID
router.delete('/bookmarks/:id', bookmarkController.removeBookmark);

module.exports = router;
