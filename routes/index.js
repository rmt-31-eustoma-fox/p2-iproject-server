const {Controller} = require('../controllers')
const express = require('express')
const authenthication = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.use(authenthication)
router.get('/cards', Controller.getCard)
router.post('/adddeck', Controller.createDeck)
router.post('/decks/:deckid', Controller.editsCards)
router.get('/decks/:deckid', Controller.getMyDeckCards)

module.exports = router