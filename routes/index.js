const router = require('express').Router()
const Controller = require('../controllers')
const { auth, authorize } = require('../middlewares')

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/google-sign-in", Controller.loginByGoogle)
router.get("/books", Controller.getBooks)
router.get("/quotes", Controller.getQuotes)

router.use(auth)

router.post("/mybooks", Controller.addMyBook)
router.get("/mybooks", Controller.getMyBooks)
router.patch("/mybooks/:id", authorize, Controller.updateReading)
router.get("/mybooks/:id", authorize, Controller.getMyBookById)

module.exports = router