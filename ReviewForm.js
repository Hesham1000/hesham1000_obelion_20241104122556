import React, { useState } from 'react';
import './ReviewForm.css';
import axios from 'axios';

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://ReviewForm.js-backend.cloud-stacks.com/api/reviews', {
        rating,
        reviewText: review
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Handle successful review submission, e.g., reset form or redirect
      setRating(0);
      setReview('');
    } catch (error) {
      // Handle error in review submission
    }
  };

  return (
    <div className="review-form-container">
      <header className="review-header">Write Reviews</header>
      <nav className="navigation-tabs">
        {/* Navigation tabs logic here */}
      </nav>
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="rating-section">
          <span className="rating-label">Rate the Restaurant:</span>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'selected' : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="review-section">
          <textarea
            className="review-textarea"
            value={review}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
          />
        </div>
        <button type="submit" className="submit-button">Submit Review</button>
      </form>
      <footer className="review-footer">
        {/* Footer links here */}
      </footer>
    </div>
  );
}

export default ReviewForm;
