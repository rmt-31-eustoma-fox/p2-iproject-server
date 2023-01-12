const router = require('express').Router()
const {
    register,
    login,
    customerSignIn,
    twitter,
    callback
} = require('../controllers/userController')

router.post('/register', register)
router.post('/login', login)
router.post('/sign-in', customerSignIn)
// router.get('/twitter', twitter)
// router.get('/twitter/callback', callback)



module.exports = router