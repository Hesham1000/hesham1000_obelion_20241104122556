import React, { useState, useEffect } from 'react';
import './BookmarksPage.css';
import axios from 'axios';

const BookmarksPage = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get('https://foodieApp-backend.cloud-stacks.com/api/bookmarks');
        setBookmarks(response.data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, []);

  const handleAddBookmark = async () => {
    if (restaurantName) {
      try {
        const response = await axios.post(
          'https://foodieApp-backend.cloud-stacks.com/api/bookmarks',
          { restaurantName },
          { headers: { 'Content-Type': 'application/json' } }
        );
        setBookmarks([...bookmarks, response.data]);
        setRestaurantName('');
      } catch (error) {
        console.error('Error adding bookmark:', error);
      }
    }
  };

  const handleRemoveBookmark = async (id) => {
    try {
      await axios.delete(`https://foodieApp-backend.cloud-stacks.com/api/bookmarks/${id}`);
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  return (
    <div className="bookmarks-page">
      <header className="header">
        <div className="logo">FoodieApp</div>
        <h1>Bookmark favorite restaurants</h1>
        <nav className="navigation-tabs">
          <a className="tab active">Bookmarks</a>
          <a className="tab">Other</a>
        </nav>
      </header>
      <main className="main-body">
        <div className="form-section">
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="Enter restaurant name"
          />
          <button onClick={handleAddBookmark}>Add to bookmarks</button>
        </div>
        <div className="bookmarks-list">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="bookmark-item">
              <span>{bookmark.restaurantName}</span>
              <button onClick={() => handleRemoveBookmark(bookmark.id)}>Remove</button>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <div>© 2023 FoodieApp</div>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </footer>
    </div>
  );
};

export default BookmarksPage;
