'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'CategoryId'
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required"
        },
        notEmpty: {
          msg: "Name is required"
        },
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image is required"
        },
        notEmpty: {
          msg: "Image is required"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Category",
        key: "id"
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};