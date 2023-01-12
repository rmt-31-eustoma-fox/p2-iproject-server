'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      abbr: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      TeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      nationality: {
        type: Sequelize.STRING
      },
      countryName: {
        type: Sequelize.STRING
      },
      countryCode: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      birthplace: {
        type: Sequelize.STRING
      },
      world_championships: {
        type: Sequelize.INTEGER
      },
      podiums: {
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
    await queryInterface.dropTable('Drivers');
  }
};