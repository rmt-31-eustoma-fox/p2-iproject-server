'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cities = require('../data/city.json').map((el) => {
      el.createdAt = el.updatedAt = new Date ()
      return el
    })
    await queryInterface.bulkInsert('Cities', cities)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities')
  }
};
