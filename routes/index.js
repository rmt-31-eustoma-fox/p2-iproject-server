const router = require('express').Router()
const Controller = require('../controllers')
const { auth } = require('../middlewares')

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/google-sign-in", Controller.loginByGoogle)
router.get("/books", Controller.getBooks)

router.use(auth)

router.post("/mybooks", Controller.addMyBook)
router.get("/mybooks", Controller.getMyBooks)

module.exports = router