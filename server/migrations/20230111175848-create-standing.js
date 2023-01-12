'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Standings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.INTEGER
      },
      DriverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Drivers',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      points: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Standings');
  }
};