'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameTodo: {
        allowNull:false,
        type: Sequelize.STRING
      },
      dateStart: {
        allowNull:false,
        type: Sequelize.DATE
      },
      dateEnd: {
        allowNull:false,
        type: Sequelize.DATE
      },
      CategoryId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'Categories',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      UserId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      level: {
        allowNull:false,
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
    await queryInterface.dropTable('Todos');
  }
};