const axios = require("axios")

class Controller{
  static async dog(req, res, next){
    try {
      const dog = await axios({
        url: "https://dog-api.kinduff.com//api/facts"
      })
      const facts = (dog.data.facts[0])
      res.status(200).json({message: facts})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller