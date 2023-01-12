const express = require('express')
const Controller = require('../controllers')
const movieRouter = express.Router()

movieRouter.get("/:movieId", Controller.getOneMovie);

module.exports = movieRouter