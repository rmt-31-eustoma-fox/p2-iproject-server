const express = require('express')
const Controller = require('../controllers')
const userRouter = express.Router()

userRouter.get("/", Controller.getUserData);
userRouter.post("/subscribe", Controller.userSubscribe);
userRouter.post("/email", Controller.sendEmailUser);
userRouter.patch("/subscribe", Controller.updateSubs);
userRouter.post("/:movieId", Controller.addWatchList);

module.exports = userRouter