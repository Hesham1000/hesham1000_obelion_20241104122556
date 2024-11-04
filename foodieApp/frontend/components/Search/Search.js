import React, { useState } from 'react';
import './Search.css';
import axios from 'axios';

function Search() {
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setCuisine(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://foodieApp-backend.cloud-stacks.com/api/search/restaurants', {
        params: {
          location,
          cuisine,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setRestaurants(response.data);
    } catch (error) {
      setError('An error occurred while searching for restaurants');
    }
  };

  return (
    <div className="search-container">
      <header className="search-header">
        <div className="logo">FoodieApp</div>
        <nav className="navigation-tabs">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </header>
      <main className="search-body">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
          />
          <select value={cuisine} onChange={handleCuisineChange}>
            <option value="">Select Cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="restaurant-list">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-item">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.address}</p>
              <p>Cuisine: {restaurant.cuisine}</p>
            </div>
          ))}
        </div>
        <div className="additional-links">
          <a href="#popular-cuisines">Popular Cuisines</a>
          <a href="#top-rated">Top Rated</a>
          <a href="#new-additions">New Additions</a>
        </div>
      </main>
      <footer className="search-footer">
        <a href="#privacy-policy">Privacy Policy</a>
        <a href="#terms-conditions">Terms and Conditions</a>
        <div className="social-media">
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default Search;
