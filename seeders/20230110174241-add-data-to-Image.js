'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const images = require('../data/image.json').map((el) => {
      el.createdAt = el.updatedAt = new Date ()
      return el
    })
    queryInterface.bulkInsert('Images', images)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Images')
  }
};
