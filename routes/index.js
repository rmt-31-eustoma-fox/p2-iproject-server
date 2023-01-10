const {Controller} = require('../controllers')
const express = require('express')
const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)

module.exports = router