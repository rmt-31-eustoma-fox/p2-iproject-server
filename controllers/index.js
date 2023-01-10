const { compareHash } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User, City } = require('../models')

class Controller {
    static async register (req, res, next) {
        const {name, email, password, dateOfBirth, phoneNumber, address} = req.body
        try {
            const newUser = await User.create({name, email, password, dateOfBirth, phoneNumber, address})
            res.status(201).json({ message : `Success register, Welcome ${newUser.name}`, name: newUser.name })
        } catch (error) {
            next(error)
        }
    }

    static async login (req, res, next) {
        const {email, password} = req.body
        try {
            const user = await User.findOne({
                where: {email}
            })
            if (!user) {
                throw {name: 'Invalid'}
            } else {
                const isValid = compareHash(password, user.password)
                if (!isValid) {
                    throw {name: 'Invalid'}
                } else {
                    const access_token = signToken({id: user.id})
                    res.status(200).json({access_token, username: user.name})
                }
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async showCities (req, res, next) {
        try {
            const cities = await City.findAll()
            res.status(200).json(cities)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller