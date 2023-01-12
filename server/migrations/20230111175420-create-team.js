'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      base: {
        type: Sequelize.STRING
      },
      first_team_entry: {
        type: Sequelize.INTEGER
      },
      world_championships: {
        type: Sequelize.INTEGER
      },
      president: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      technical_manager: {
        type: Sequelize.STRING
      },
      chassis: {
        type: Sequelize.STRING
      },
      engine: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teams');
  }
};