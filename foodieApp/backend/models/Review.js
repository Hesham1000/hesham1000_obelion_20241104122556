const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/dbConnection');

class Review extends Model {}

Review.init({
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    }
  },
  reviewText: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Review',
  timestamps: false,
});

module.exports = Review;
