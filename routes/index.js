const {Controller} = require('../controllers')
const express = require('express')
const authenthication = require('../middlewares/authentication')
const router = express.Router()


router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/google-sign-in', Controller.google)
router.use(authenthication)
router.get('/user', Controller.user)
router.get('/qrweb', Controller.getWeb)
router.get('/cards', Controller.getCard)
router.post('/adddeck', Controller.createDeck)
router.get('/mydecks', Controller.getMyDecks)
router.post('/decks/:deckid', Controller.editsCards)
router.get('/decks/:deckid', Controller.theDeck)
router.delete('/decks/:deckid', Controller.deleteDeck)
router.get('/selectcard', Controller.selectCard)
router.delete('/deckscard/:deckid', Controller.deleteCard)


module.exports = router