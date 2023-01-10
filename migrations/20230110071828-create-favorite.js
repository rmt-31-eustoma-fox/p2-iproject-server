'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      uuid: {
        type: Sequelize.UUID,
      },
      displayName: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      roleDesc: {
        type: Sequelize.TEXT,
      },
      ability1Name: {
        type: Sequelize.STRING,
      },
      ability1Desc: {
        type: Sequelize.TEXT,
      },
      ability2Name: {
        type: Sequelize.STRING,
      },
      ability2Desc: {
        type: Sequelize.TEXT,
      },
      ability3Name: {
        type: Sequelize.STRING,
      },
      ability3Desc: {
        type: Sequelize.TEXT,
      },
      ultName: {
        type: Sequelize.STRING,
      },
      ultDesc: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
  },
};
