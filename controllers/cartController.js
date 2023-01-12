const e = require('express')
const {
    json
} = require('sequelize')
const {
    Product,
    Cart,
    sequelize,
    User
} = require('../models')
const midtransClient = require('midtrans-client');

class cartController {
    static async addCart(req, res, next) {
        try {
            const addToCart = {
                UserId: req.user.id,
                ProductId: +req.body.ProductId,
                quantity: +req.body.quantity,
                status: false
            }
            // console.log(addToCart);
            const cart = await Cart.findOne({
                where: {
                    UserId: addToCart.UserId,
                    ProductId: addToCart.ProductId,
                    status: false
                },
                attributes: ['id', 'UserId', 'ProductId', 'status', 'quantity']
            })
            // res.status(200).json(cart)
            const productToAdd = await Product.findByPk(+req.body.ProductId)
            // console.log(productToAdd);
            if (productToAdd.stock === 0) {
                res.status(401).json({
                    message: "Sorry, out of stock!"
                })
                return
            }

            if (!cart) {
                const createCart = await Cart.create(addToCart)
                res.status(201).json(createCart)

            } else {
                console.log(productToAdd.stock, cart.quantity, addToCart.quantity);
                if ((productToAdd.stock - cart.quantity - addToCart.quantity) < 0) {
                    // console.log(cart.id);
                    const checkQuantity = await Cart.update({
                        quantity: productToAdd.stock
                    }, {
                        where: {
                            id: cart.id,
                            status: false
                        },
                    })
                    res.status(401).json({
                        message: "Sorry, out of stock!"
                    })
                    return
                } else {
                    console.log('masuk sini');
                    const updateCart = await Cart.update({
                        quantity: cart.quantity + addToCart.quantity
                    }, {
                        where: {
                            id: cart.id,
                            status: false
                        },
                        returning: true
                    })
                    if (updateCart[1][0].quantity <= 0) {
                        const deleteCart = await Cart.destroy({
                            where: {
                                id: cart.id
                            }
                        })
                        res.status(200).json({
                            message: 'succesfully delete cart'
                        })
                    } else {
                        res.status(200).json(updateCart)
                    }
                }
                // console.log(productToAdd.stock - cart.quantity - addToCart.quantity);
            }

        } catch (error) {
            next(error)
        }
    }

    static async fetchCart(req, res, next) {
        try {
            // let subTotal;
            const carts = await Cart.findAll({
                where: {
                    UserId: req.user.id,
                    status: false
                },
                attributes: ['id', 'UserId', 'ProductId', 'status', 'quantity'],
                include: ['Product'],
                order: [
                    ['createdAt', 'ASC']
                ]
            })
            let subTotal = 0
            const sub = carts.map(el => {
                subTotal = el.quantity * el.Product.price
                // subTotal += el.subTotal
                return subTotal
            })
            let total = sub.reduce((acc, cur) => acc + cur)
            res.status(200).json({
                carts,
                sub,
                total
                // subTotal
            })
        } catch (error) {
            next(error)

        }
    }

    static async history(req, res, next) {
        try {
            const carts = await Cart.findAll({
                where: {
                    UserId: req.user.id,
                    status: true
                },
                include: [Product],
                order: [
                    ['updatedAt', 'ASC']
                ]
            })
            res.status(200).json(carts)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCart(req, res, next) {
        try {
            const {
                id
            } = req.params
            const deleted = await Cart.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                message: 'cart has been deleted'
            })
        } catch (error) {
            next(error)

        }
    }

    static async checkout(req, res, next) {
        const transaction = await sequelize.transaction()
        try {
            const user = await User.findByPk(req.user.id)
            // console.log('masuk');
            const checkoutCarts = await Cart.findAll({
                where: {
                    UserId: req.user.id,
                    status: false
                },
                attributes: ['id', 'UserId', 'quantity', 'status'],
                include: ['Product']
            })
            let subTotal = 0
            const sub = checkoutCarts.map(el => {
                subTotal = el.quantity * el.Product.price
                // subTotal += el.subTotal
                return subTotal
            })
            // let total = 0
            // for (let i = 0; i < sub.length; i++) {
            //     total += sub[i]
            // }
            let total = sub.reduce((acc, cur) => acc + cur)
            // console.log(sub, total);
            // res.status(200).json({
            //     sub,
            //     total
            // })
            let toBuy = []
            let errors = []
            let failed = []
            checkoutCarts.forEach(el => {
                if (el.quantity <= el.Product.stock) {
                    toBuy.push(Product.update({
                        stock: el.Product.stock - el.quantity
                    }, {
                        where: {
                            id: el.Product.id
                        },
                        returning: true,
                        transaction
                    }))
                    toBuy.push(Cart.update({
                        status: true
                    }, {
                        where: {
                            id: el.id
                        },
                        returning: true,
                        transaction
                    }))

                } else {
                    errors.push(`Failed to buy ${el.Product.name}`)
                    failed.push(Cart.update({
                        quantity: el.Product.stock
                    }, {
                        where: {
                            id: el.id,
                            status: false
                        }
                    }))
                }
            })

            const success = await Promise.all(toBuy)
            if (errors.length > 0) {
                await Promise.all(failed)
                res.status(400).json({
                    message: errors
                })
            }
            await transaction.commit()
            res.status(200).json({
                success
            })
            console.log(success);
        } catch (error) {
            await transaction.rollback()
            next(error)
        }
    }

    static async payment(req, res, next) {
        try {
            const checkoutCarts = await Cart.findAll({
                where: {
                    UserId: req.user.id,
                    status: false
                },
                attributes: ['id', 'UserId', 'quantity', 'status'],
                include: ['Product']
            })
            let subTotal = 0
            const sub = checkoutCarts.map(el => {
                subTotal = el.quantity * el.Product.price
                // subTotal += el.subTotal
                return subTotal
            })
            // let total = 0
            // for (let i = 0; i < sub.length; i++) {
            //     total += sub[i]
            // }
            let total = sub.reduce((acc, cur) => acc + cur)
            const user = await User.findByPk(req.user.id)

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: 'SB-Mid-server-SzvLU8-lfRmFVnxaY01g7dL6'
            })
            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTIONS_" + Math.floor(100000 + Math.random() * 900000),
                    "gross_amount": total
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "name": user.name,
                    "email": user.email,

                }
            }
            // await transaction.commit()
            const midtransToken = await snap.createTransaction(parameter)
            res.status(200).json({

                midtransToken
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = cartController