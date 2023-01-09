const Controller = require('../controller')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({message : 'Hello There'})
})

router.get('/currencies', Controller.getAllCurrency)

module.exports = router