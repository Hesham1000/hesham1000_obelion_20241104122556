import React, { useState } from 'react';
import './RestaurantPage.css';

function RestaurantPage() {
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('https://foodieApp-backend.cloud-stacks.com/api/search/restaurants?location=' + encodeURIComponent(location) + '&cuisine=' + encodeURIComponent(cuisine), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const results = await response.json();
      setRestaurants(results);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="restaurant-page">
      <header className="header">
        <div className="logo">FoodieApp</div>
        <nav className="nav-tabs">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </header>
      <main className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option value="">Select cuisine</option>
            <option value="italian">Italian</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
            <option value="mexican">Mexican</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="additional-links">
          <a href="#popular">Popular Cuisines</a>
          <a href="#top-rated">Top Rated</a>
          <a href="#new-additions">New Additions</a>
        </div>
        <div className="search-results">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.address}</p>
              <p>Cuisine: {restaurant.cuisine}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms and Conditions</a>
        <a href="#social-media">Social Media</a>
      </footer>
    </div>
  );
}

export default RestaurantPage;
