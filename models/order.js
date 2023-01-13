'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    code: DataTypes.STRING,
    authors: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    publisher: DataTypes.STRING,
    publishedDate: DataTypes.STRING,
    pageCount: DataTypes.INTEGER,
    isbn: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};