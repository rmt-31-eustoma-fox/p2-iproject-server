const routes = require('express').Router()
const router = require('./userRoutes')
const productRouter = require('./productsRoutes')
const cartRouter = require('./cartRoutes')


routes.use('/', router)
routes.use('/products', productRouter)
router.use('/carts', cartRouter)



module.exports = routes