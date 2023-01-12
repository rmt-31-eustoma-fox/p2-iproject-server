const { comparePassword } = require("../helpers/bcrypt")
const sendMail = require("../helpers/email")
const { encodeToken } = require("../helpers/jwt")
const response = require("../helpers/response")
const {User} = require("../models")


class AuthCustomer {
    static async newUser (req,res,next) {
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'customer'
        }

        try {
            const newUser = await User.create(data)
            sendMail("muharifbudiman07@gmail.com",data.email,"success register", "please login to the app")
            return response(res, 201, "success register new customer", newUser)
        } catch (error) {
            next(error)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw {
                    name: "Bad Request",
                    message: "Email is required"
                }
            }

            if (!password) {
                throw {
                    name: "Bad Request",
                    message: "Password is required"
                }
            }

            const user = await User.findOne({
                where: { email }
            })

            const error = {
                name: "Invalid Login",
                message: "Invalid email/password"
            }

            if (!user) {
                throw error
            } else {
                const isValid = comparePassword(password, user.password)
                if (!isValid) {
                    throw error
                } else {
                    const access_token = encodeToken({
                        id: user.id,
                        email: user.email
                    })
                    return response(res, 201, "success login customer", access_token)
                }
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = AuthCustomer