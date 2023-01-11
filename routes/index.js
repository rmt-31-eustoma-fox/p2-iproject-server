const Controller = require('../controller')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({message : 'Hello There'})
})

router.get('/currencies', Controller.getAllCurrency)
router.get('/forexNews', Controller.getForexNews)
router.get('/forexValue', Controller.getForexPairValue)
router.get('/forexExcRate', Controller.getExchangeRatio)

module.exports = router