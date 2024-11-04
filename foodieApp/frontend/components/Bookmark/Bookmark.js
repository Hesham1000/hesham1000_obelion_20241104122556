import React, { useState, useEffect } from 'react';
import './Bookmark.css';
import axios from 'axios';

function Bookmark() {
  const [restaurantName, setRestaurantName] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get('https://foodieApp-backend.cloud-stacks.com/api/bookmarks');
      setBookmarks(response.data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const handleAddBookmark = async () => {
    if (restaurantName) {
      try {
        const response = await axios.post('https://foodieApp-backend.cloud-stacks.com/api/bookmarks', {
          restaurantName,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setBookmarks([...bookmarks, response.data]);
        setRestaurantName('');
      } catch (error) {
        console.error('Error adding bookmark:', error);
      }
    }
  };

  const handleRemoveBookmark = async (id) => {
    try {
      await axios.delete(`https://foodieApp-backend.cloud-stacks.com/api/bookmarks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setBookmarks(bookmarks.filter(restaurant => restaurant.id !== id));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  return (
    <div className="bookmark-page">
      <header className="header">
        <div className="logo">FoodieApp</div>
        <div className="nav-tabs">
          <span className="nav-tab active">Bookmark</span>
          <span className="nav-tab">Other Tab</span>
        </div>
      </header>
      <main className="main-body">
        <h1>Bookmark favorite restaurants</h1>
        <div className="form">
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="Enter restaurant name"
          />
          <button onClick={handleAddBookmark}>Add to bookmarks</button>
        </div>
        <div className="bookmarks-list">
          {bookmarks.map((restaurant) => (
            <div key={restaurant.id} className="bookmark-item">
              <span>{restaurant.restaurantName}</span>
              <button onClick={() => handleRemoveBookmark(restaurant.id)}>Remove</button>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <div>&copy; 2023 FoodieApp</div>
        <div>
          <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default Bookmark;
