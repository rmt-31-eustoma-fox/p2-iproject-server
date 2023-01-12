const {
    allProduct,
    create,
    findProduct,
    deleteProduct,
    update
} = require('../controllers/productsController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorizationAdmin')

const productRouter = require('express').Router()

productRouter.get('/', allProduct)

productRouter.use(authentication)

productRouter.post('/', authorization, create)
productRouter.delete('/:id', authorization, deleteProduct)
productRouter.put('/:id', authorization, update)
productRouter.get('/:id', findProduct)


module.exports = productRouter