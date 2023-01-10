const Controller = require("../controllers/users");
const usersRouter = require("express").Router();

usersRouter.post("/register", Controller.create);
usersRouter.post("/login", Controller.login);
// usersRouter.post("/google/sign-in", Controller.googleLogin)

module.exports = usersRouter;