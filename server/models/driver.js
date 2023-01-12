'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.belongsTo(models.Team)
      Driver.hasOne(models.Standing)
    }
  }
  Driver.init({
    name: DataTypes.STRING,
    abbr: DataTypes.STRING,
    number: DataTypes.INTEGER,
    image: DataTypes.STRING,
    TeamId: DataTypes.INTEGER,
    nationality: DataTypes.STRING,
    countryName: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    birthplace: DataTypes.STRING,
    world_championships: DataTypes.INTEGER,
    podiums: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};