"use strict";

const { default: axios } = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const {data} = await axios({
      method: "GET",
      url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols",
      headers: {
        "X-RapidAPI-Key": "456d727bc2msh92dec82df95eaa3p1c867djsn3d1b68e43101",
        "X-RapidAPI-Host":
          "currency-conversion-and-exchange-rates.p.rapidapi.com",
      },
    });

    const finalData = []
    for(const value in data.symbols){
      finalData.push([value,data.symbols[value]])
    }

    // console.log(finalData)
    await queryInterface.bulkInsert('Currencies',finalData.map(el => {
      const objVal = {
        name : el[1],
        symbol : el[0],
        createdAt : new Date(),
        updatedAt : new Date(),
      }
      return objVal
    }))
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Currencies',null)
  },
};
