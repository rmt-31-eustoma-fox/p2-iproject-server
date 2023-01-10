const router = require("express").Router();
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);

module.exports = router;
