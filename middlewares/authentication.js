const {
    User
} = require('../models')
const {
    verifyToken
} = require('../helpers/jwt')
const authentication = async (req, res, next) => {
    try {
        const {
            access_token
        } = req.headers
        if (!access_token) {
            res.status(401).json({
                message: "Invalid token"
            })
            return
        }

        const payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)

        if (!user) {
            res.status(401).json({
                message: "Invalid token"
            })
            return
        }
        req.user = {
            id: user.id
        }
        next()
    } catch (error) {
        next(error)

    }
}

module.exports = authentication