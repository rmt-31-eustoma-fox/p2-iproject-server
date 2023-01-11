const Controller = require('../controllers/index')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('google-sign-in', Controller.googleSign)

router.get('/cities', Controller.showCities)
router.get('/accomodations/:CityId', Controller.showAccomodationByCity)
router.get('/findAccomodations/:accomodationId', Controller.findAccomodation)

router.use(authentication)

router.get('/transactions', Controller.showTransactions)
router.post('/transactions/:accomodationId', Controller.addTransaction)
router.delete('/transactions/:id', Controller.deleteTransaction)

router.post('/midtransToken/:id', Controller.makePayment)

router.patch('/transactions/:id', Controller.completePayment)

module.exports = router