'use strict';

const { hashPw } = require('../helpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [{
    username: "Alpha",
    email: "aplha@mail.com",
    password: hashPw("aplha"),
    createdAt: new Date(),
    updatedAt: new Date()
   }])

   await queryInterface.bulkInsert('MyBooks', [{
    title: "Logika Pemrograman Menggunakan Java",
    code: "SbMoEAAAQBAJ",
    authors: "Abdul Kadir",
    imageUrl: "http://books.google.com/books/content?id=SbMoEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    publisher: "Elex Media Komputindo",
    publishedDate: "2021-04-09",
    pageCount: 566,
    isbn: "9786230019500",
    price: 83297,
    description: "Buku ini lebih menekankan pada cara untuk menyelesaikan masalah. Oleh karena itu, banyak contoh permasalahan yang diberikan dan cara untuk menyelesaikannya. Contoh-contoh yang cukup banyak dan bahasa yang mudah dipahami membuat buku ini sangat mudah digunakan dan dapat menjadi penuntun untuk memelajari bahasa Java secara mandiri.",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('MyBooks')
    await queryInterface.bulkDelete('Users')
  }
};
