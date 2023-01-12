'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Accomodation)
    }
  }
  Image.init({
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image Url is required'
        },
        notNull: {
          msg: 'Image Url is required'
        }
      }
    },
    AccomodationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Accomodation Id is required'
        },
        notNull: {
          msg: 'Accomodation Id is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};