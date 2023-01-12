'use strict';

const users = require("../data/users.json");

const {encryptPass} = require("../helpers/bcryptjs");

module.exports = {
  up: async(models, mongoose) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return models.Test.bulkWrite([
        {
          insertOne: {
            document: {
              name: 'first test'
            }
          }
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    */


    const finalData = users.map(val => {
      val.password = encryptPass(val.password);
      val.birthDate = new Date(val.birthDate);
      return val;
    })

    await models.User.create(finalData);
  },

  down: async(models, mongoose) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return models.Test.bulkWrite([
        {
          deleteOne: {
            filter: {
              name: 'first test'
            }
          }
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    */
   await models.User.deleteMany();
  }
};
