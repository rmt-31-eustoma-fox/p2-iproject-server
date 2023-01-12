const users = require('./user');
const customers = require('./customer');
const movies = require('./movie');
const news = require('./news');
const favorite = require('./favorite');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.use('/users', users)
router.use('/customers', customers)

router.use(authentication)

router.use(movies)
router.use(news)
router.use(favorite)


module.exports = router