const router = require("express").Router();
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign-in", Controller.googleSignin);

router.use(authentication);

module.exports = router;
