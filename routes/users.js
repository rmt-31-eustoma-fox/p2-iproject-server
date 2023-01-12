const Controller = require("../controllers/users");
const authentication = require("../middlewares/authentication");
const usersRouter = require("express").Router();

usersRouter.post("/register", Controller.create);
usersRouter.post("/login", Controller.login);
usersRouter.post("/google/sign-in", Controller.googleLogin)

usersRouter.use(authentication)
usersRouter.get("/find", Controller.findUser)
usersRouter.patch("/subscription", Controller.subscription)
usersRouter.post("/generate-midtrans-token", Controller.midtrans)

module.exports = usersRouter;