'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.hasMany(models.Driver)
    }
  }
  Team.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    base: DataTypes.STRING,
    first_team_entry: DataTypes.INTEGER,
    world_championships: DataTypes.INTEGER,
    president: DataTypes.STRING,
    director: DataTypes.STRING,
    technical_manager: DataTypes.STRING,
    chassis: DataTypes.STRING,
    engine: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};