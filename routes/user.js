const AuthController = require('../controllers/auth');

const router = require('express').Router();

router.post('/register', AuthController.newUser )

router.post('/login', AuthController.loginUser)

module.exports = router