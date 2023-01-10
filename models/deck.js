'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Deck.belongsTo(models.Profile, {onDelete: "cascade", onUpdate: "cascade"})
      Deck.hasMany(models.DeckCard, {onDelete: "cascade", onUpdate: "cascade"})
    }
  }
  Deck.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: "Profiles", key: "id"},
      onDelete: "cascade",
      onUpdate: "cascade"
    }
  }, {
    sequelize,
    modelName: 'Deck',
  });
  return Deck;
};