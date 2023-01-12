const Controller = require("../controllers/rooms");
const roomsRouter = require("express").Router();

roomsRouter.get("/getroom", Controller.getRoom)

module.exports = roomsRouter