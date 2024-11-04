const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('foodieApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

class Bookmark extends Model {
  static init(sequelize) {
    super.init({
      restaurantName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      }
    }, {
      sequelize,
      modelName: 'Bookmark',
      timestamps: false,
    });
  }
}

Bookmark.init(sequelize);

module.exports = Bookmark;
