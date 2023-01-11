const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const usersRouter = require("./users");
const roomsRouter = require("./rooms")
const translateRouter = require("./translate")


router.use("/users", usersRouter);
roomsRouter.use(authentication);
router.use("/rooms", roomsRouter)
router.use("/translate", translateRouter)


module.exports = router;