'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User);
    }
  }
  Favorite.init(
    {
      UserId: DataTypes.INTEGER,
      uuid: DataTypes.UUID,
      displayName: DataTypes.STRING,
      description: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      role: DataTypes.STRING,
      roleDesc: DataTypes.TEXT,
      ability1Name: DataTypes.STRING,
      ability1Desc: DataTypes.TEXT,
      ability2Name: DataTypes.STRING,
      ability2Desc: DataTypes.TEXT,
      ability3Name: DataTypes.STRING,
      ability3Desc: DataTypes.TEXT,
      ultName: DataTypes.STRING,
      ultDesc: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Favorite',
    }
  );
  return Favorite;
};
