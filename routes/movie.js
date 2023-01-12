const Movie = require('../controllers/movie');


const router = require('express').Router();

router.get('/movies', Movie.getAllMovieTrending)

router.get('/movies/:movieId', Movie.getMovieById)

module.exports= router