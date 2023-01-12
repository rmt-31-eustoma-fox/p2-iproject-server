const Controller = require("../controllers/animals");
const animalsRouter = require("express").Router();

animalsRouter.get("/dog", Controller.dog)

module.exports = animalsRouter