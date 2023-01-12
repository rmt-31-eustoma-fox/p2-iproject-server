const FavoriteController = require('../controllers/favorite');



const router = require('express').Router();

router.post('/favorite/:externalId', FavoriteController.addMovieToFavorite )

router.get('/favorite', FavoriteController.getAllDataFavorite)

module.exports = router