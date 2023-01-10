const express = require('express');
const Controller = require('../controllers');
const authentication = require('../middlewares/authentication');
const router = express.Router();

router.get('/agents', Controller.agents);
router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/google-sign-in', Controller.googleSignIn);

router.use(authentication);

router.get('/favorite');
router.post('/favorite/:agentId');
router.delete('/favorite/:agentId');

module.exports = router;
