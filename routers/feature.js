const Today = require('../controllers/today')

const router = require('express').Router()

router.post('/category', Today.addCategory)
router.delete('/category/:categoryid', Today.destroyCategory)
router.post('/todo',)



module.exports = router