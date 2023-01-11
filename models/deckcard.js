'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeckCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DeckCard.belongsTo(models.Deck, {onDelete: "cascade", onUpdate: "cascade"})
    }
  }
  DeckCard.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    desc: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    image_url_small: DataTypes.TEXT,
    image_url_cropped: DataTypes.TEXT,
    CardId: DataTypes.INTEGER,
    DeckId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: "Decks", key: "id"},
      onDelete: "cascade",
      onUpdate: "cascade"
    }
  }, {
    sequelize,
    modelName: 'DeckCard',
  });
  return DeckCard;
};