const {
    Cart
} = require("../models")

const authDelete = async (req, res, next) => {
    const {
        id
    } = req.params
    console.log(id);
    try {
        const cart = await Cart.findOne({
            where: {
                id
            }
        })
        if (!cart) {
            res.status(404).json({
                message: "Data not found"
            })
            return
        }
        // console.log(cart);
        if (cart.UserId != req.user.id) {
            res.status(403).json({
                message: "You are Unauthorized"
            })
            return
        }
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authDelete