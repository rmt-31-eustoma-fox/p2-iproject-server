const {
    addCart,
    fetchCart,
    history,
    deleteCart,
    checkout,
    payment
} = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const authDelete = require('../middlewares/authorizationDelete')

const router = require('express').Router()

router.use(authentication)

router.post('/', addCart)
router.get('/', fetchCart)
router.delete('/:id', authDelete, deleteCart)
router.get('/history', history)
router.put('/', checkout)
router.get('/payment', payment)

module.exports = router