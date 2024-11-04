import React, { useState, useEffect } from 'react';
import './RestaurantPage.css';
import axios from 'axios';

function RestaurantPage() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://RestaurantPage.js-backend.cloud-stacks.com/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    if (rating > 0 && review.trim() !== '') {
      try {
        const response = await axios.post('https://RestaurantPage.js-backend.cloud-stacks.com/api/reviews', {
          rating,
          reviewText: review
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setReviews([...reviews, response.data]);
        setRating(0);
        setReview('');
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  return (
    <div className="restaurant-page">
      <header className="header">
        <h1>Write Reviews</h1>
      </header>
      <nav className="navigation-tabs">
        <a href="/restaurant">Restaurant Page</a>
      </nav>
      <section className="review-form">
        <div className="rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={`star ${rating >= num ? 'selected' : ''}`}
              onClick={() => handleRating(num)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="review-input"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
        ></textarea>
        <button className="submit-button" onClick={handleSubmit}>
          Submit Review
        </button>
      </section>
      <section className="reviews-display">
        {reviews.map((rev, index) => (
          <div key={index} className="review">
            <div className="review-rating">
              {'★'.repeat(rev.rating)}{' '}
              {'☆'.repeat(5 - rev.rating)}
            </div>
            <p className="review-text">{rev.reviewText}</p>
          </div>
        ))}
      </section>
      <footer className="footer">
        <a href="/home">Home</a>
        <a href="/about">About</a>
      </footer>
    </div>
  );
}

export default RestaurantPage;
