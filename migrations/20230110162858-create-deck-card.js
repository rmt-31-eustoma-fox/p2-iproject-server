'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeckCards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.TEXT
      },
      image_url_small: {
        type: Sequelize.TEXT
      },
      image_url_cropped: {
        type: Sequelize.TEXT
      },
      CardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      DeckId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Decks", key: 'id'},
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DeckCards');
  }
};