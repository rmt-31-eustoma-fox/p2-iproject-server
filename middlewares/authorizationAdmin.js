const {
    User
} = require('../models')
const authorization = async (req, res, next) => {
    try {
        const {
            id
        } = req.user
        const Logged = await User.findByPk(id)
        if (Logged.role != 'admin') {
            res.status(401).json({
                message: "Only for Admin"
            })
            return
        }
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authorization