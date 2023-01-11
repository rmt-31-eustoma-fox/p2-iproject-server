const { decodeToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { name: "invalid token" }
        }

        const payload = decodeToken(access_token)
        const findUser = await User.findByPk(payload.id)
        if (!findUser) {
            throw { name: "invalid token" }
        }

        req.user = {
            id: findUser.id,
            role : findUser.role,
            username: findUser.username,
            email : findUser.email
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication