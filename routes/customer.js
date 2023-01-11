const AuthCustomer = require('../controllers/authCustomer');


const router = require('express').Router();

router.post('/register', AuthCustomer.newUser)

router.post('/login', AuthCustomer.loginUser)

module.exports = router