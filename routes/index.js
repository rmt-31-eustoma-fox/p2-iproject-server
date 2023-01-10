const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const usersRouter = require("./users");


router.use("/users", usersRouter);

router.use(authentication);




module.exports = router;