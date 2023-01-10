const express = require('express');
const Controller = require('../controllers');
const authentication = require('../middlewares/authentication');
const router = express.Router();
const authorization = require('../middlewares/authorization');

router.get('/agents', Controller.agents);
router.get('/agents/:uuid', Controller.agentDetail);
router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/google-sign-in', Controller.googleSignIn);

router.use(authentication);

router.post('/favorite/:agentUuid', Controller.addToFav);
router.get('/favorite', Controller.favorites);
router.delete('/favorite/:id', authorization, Controller.removeFav);

module.exports = router;
