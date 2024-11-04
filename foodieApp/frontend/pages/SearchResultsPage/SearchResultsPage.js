import React, { useState } from 'react';
import './SearchResultsPage.css';

function SearchResultsPage() {
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('https://foodieApp-backend.cloud-stacks.com/api/search/restaurants?location=' + location + '&cuisine=' + cuisine, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="search-results-page">
      <header className="header">
        <div className="logo">FoodieApp</div>
        <nav className="nav-tabs">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </header>
      <main className="body">
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
            <option value="">Select Cuisine</option>
            <option value="italian">Italian</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="additional-links">
          <a href="/popular-cuisines">Popular Cuisines</a>
          <a href="/top-rated">Top Rated</a>
          <a href="/new-additions">New Additions</a>
        </div>
        <div className="search-results">
          {results.map((restaurant, index) => (
            <div key={index} className="restaurant">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.details}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms and Conditions</a>
        <div className="social-media">
          <a href="/facebook">Facebook</a>
          <a href="/twitter">Twitter</a>
          <a href="/instagram">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default SearchResultsPage;
