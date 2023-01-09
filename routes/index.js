const users = require('./user');

const router = require('express').Router();
router.use('/users', users)


module.exports = router