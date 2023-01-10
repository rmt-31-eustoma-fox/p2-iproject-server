const Controller = require("../controllers/rooms");
const roomsRouter = require("express").Router();




roomsRouter.post("/addroom", Controller.addRoom)
roomsRouter.get("/getroom", Controller.getRoom)

module.exports = roomsRouter