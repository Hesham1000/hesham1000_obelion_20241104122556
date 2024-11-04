const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/dbConnection');

class Restaurant extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      cuisine: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      }
    }, {
      sequelize,
      modelName: 'Restaurant',
      tableName: 'restaurants',
      timestamps: false
    });
  }
}

module.exports = Restaurant;
