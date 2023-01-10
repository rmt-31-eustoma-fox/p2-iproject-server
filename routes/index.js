const express = require('express');
const Controller = require('../controllers');
const router = express.Router();

router.get('/agents', Controller.agents);

module.exports = router;
