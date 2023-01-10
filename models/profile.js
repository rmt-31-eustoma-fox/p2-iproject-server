'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {onDelete: "cascade", onUpdate: "cascade"})
      Profile.hasMany(models.Deck, {onDelete: "cascade", onUpdate: "cascade"})
    }
  }
  Profile.init({
    image: DataTypes.TEXT,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: "Users", key: "id"},
      onDelete: "cascade",
      onUpdate: "cascade"
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};