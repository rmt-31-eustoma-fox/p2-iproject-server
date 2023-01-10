const { Room } = require("../models");

class Controller{
  static async addRoom(req, res, next){
    try {
      const {name} = req.body
      await Room.create({name})
      res.status(201).json({message: `succes create room ${name}`})
    } catch (error) {
      next(error)
    }
  }

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