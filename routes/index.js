const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const usersRouter = require("./users");
const roomsRouter = require("./rooms")


router.use("/users", usersRouter);
roomsRouter.use(authentication);
router.use("/rooms", roomsRouter)


module.exports = router;