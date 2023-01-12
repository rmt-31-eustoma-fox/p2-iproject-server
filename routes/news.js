const News = require('../controllers/news');



const router = require('express').Router();

router.get('/news', News.getAllNews)


module.exports= router