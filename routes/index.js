const express = require('express')
const Controller = require('../controllers')
const authen = require('../middlewares/authentication')
const movieRouter = require('./movie')
const userRouter = require('./user')
const mainRouter = express.Router()

mainRouter.post("/login", Controller.loginForm)
mainRouter.post("/register", Controller.registerForm)
mainRouter.post("/google-login", Controller.googleLogin)
mainRouter.post("/facebook-login", Controller.facebookLogin)
mainRouter.get("/moviesgenres", Controller.getMoviesAndGenre)
mainRouter.use(authen);
mainRouter.use("/movies",movieRouter);
mainRouter.use("/users", userRouter);

module.exports = mainRouter