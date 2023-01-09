'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User)
    }
  }
  Favorite.init({
    id : {
      type : DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey : true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "UserId is required" },
        notEmpty: { msg: "UserId is required" }
      }
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "ExternalId is required" },
        notEmpty: { msg: "ExternalId is required" }
      }
    },
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};