'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const accomodations = require('../data/accomodations.json').map((el) => {
      el.updatedAt = el.createdAt = new Date ()
      return el
    })
    await queryInterface.bulkInsert('Accomodations', accomodations)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accomodations')
  }
};
