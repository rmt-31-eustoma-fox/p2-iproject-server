const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const usersRouter = require("./users");
const roomsRouter = require("./rooms")
const translateRouter = require("./translate")
const animalsRouter = require("./animals")


router.use("/users", usersRouter);
roomsRouter.use(authentication);
router.use("/rooms", roomsRouter)
router.use("/translate", translateRouter)
router.use("/animals", animalsRouter)


module.exports = router;