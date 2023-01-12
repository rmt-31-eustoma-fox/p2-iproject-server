const { Room } = require("../models");

class Controller{

  static async getRoom(req, res, next){
    try {
      const room = await Room.findAll()
      res.status(200).json(room)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller