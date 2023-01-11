const Controller = require("../controllers/translate");
const translateRouter = require("express").Router();

translateRouter.post("/", Controller.translate);


module.exports = translateRouter;