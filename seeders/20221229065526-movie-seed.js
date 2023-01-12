'use strict';

const data = require("../data/movies.json");

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

    const genreData = await models.Genre.find();
    // console.log(genreData);


    const finalData = data.map(val => {
      val["subscripted"] = [true,false][Math.floor(Math.random() * 2 )]
      let genr = val.genres.map(val2 => {
        const id = genreData.find(val3 => val3.name === val2.name)._id;
        return id;
      });
      val.releaseDate = new Date(val.releaseDate);
      val.genres = genr;
      return val;
    })
    // console.dir(finalData,{depth:null});

   await models.Movie.create(finalData);
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
   await models.Movie.deleteMany();
  }
};
