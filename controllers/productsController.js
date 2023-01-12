const {
    Product,
    Category
} = require('../models')
const axios = require('axios');
const {
    search
} = require('../routes');

class ProductController {
    static async allProduct(req, res, next) {
        try {
            const products = await Product.findAll({
                include: {
                    model: Category,
                    attributes: ['name']
                },

                order: [
                    ['updatedAt', 'ASC']
                ]
            })
            res.status(200).json(products);

        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            // console.log(req.body);
            const newProduct = await Product.create(req.body)

            res.status(201).json({
                id: newProduct.id,
                name: newProduct.name,
                imgUrl: newProduct.imgUrl,
                price: newProduct.price,
                stock: newProduct.stock,
                CategoryId: newProduct.CategoryId
            })
        } catch (error) {
            next(error)
        }
    }

    static async findProduct(req, res, next) {
        try {
            const product = await Product.findOne({
                where: {
                    id: req.params.id
                },
                include: {
                    model: Category,
                    attributes: ['name']
                }
            })
            // console.log(product);
            if (product) {
                res.status(200).json({
                    product
                })
                return
            } else {
                res.status(404).json({
                    message: "Drugs not Found"
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {

        try {
            const deleteProduct = await Product.destroy({
                where: {
                    id: req.params.id
                }
            })

            if (deleteProduct) {
                res.status(200).json({
                    message: "succesfully delete a drugs"
                })
                return
            } else {
                res.status(404).json({
                    message: "Drugs not Found"
                })
            }


        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const updatedProduct = await Product.update(req.body, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            res.status(200).json(
                updatedProduct
            )
        } catch (error) {
            next(error)
        }
    }
}



module.exports = ProductController