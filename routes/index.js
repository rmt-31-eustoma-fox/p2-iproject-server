const express = require('express');
const Controller = require('../controllers');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World! dari routes');
});

module.exports = router;
