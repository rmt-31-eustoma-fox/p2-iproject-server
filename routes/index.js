const Controller = require('../controllers/index')
const router = require('express').Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/cities', Controller.showCities)
router.get('/accomodations/:CityId', Controller.showAccomodationByCity)

module.exports = router