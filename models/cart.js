'use strict';
const {
  Model,
  BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  }
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id"
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    quantity: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};