'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Circuit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Circuit.init({
    gpName: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    circuitName: DataTypes.STRING,
    image: DataTypes.STRING,
    laps: DataTypes.INTEGER,
    distance: DataTypes.STRING,
    timezone: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Circuit',
  });
  return Circuit;
};