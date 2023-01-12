const router = require('express').Router()
const Controller = require('../controllers')


router.get('/drivers', Controller.driverList)
router.get('/teams', Controller.teamList)
router.get('/constructors', Controller.constructorList)
router.get('/circuits', Controller.circuitList)

router.get('/circuits/:id', Controller.findEvent)
router.get('/drivers/:id', Controller.findDriver)
router.post('/payment-midtrans', Controller.midtransToken)
router.post('/invoice', Controller.invoiceSender)

module.exports = router