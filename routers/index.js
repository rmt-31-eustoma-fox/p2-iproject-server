const Index = require('../controllers');
const Today = require('../controllers/today');
const autentification = require('../middlewares/autentification');

const router = require('express').Router();
const featureRouter = require('./feature');
// router.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

router.post('/register', Index.register);
router.post('/login', Index.login);
router.post('/sign', Today.handleGoogleSignIn);
router.use(autentification);
router.use('/today', featureRouter);

module.exports = router;
