const {User, Profile, Deck, DeckCard} =require('../models')
const {comparePassword} = require('../helpers/bcryptjs')
const {encodeToken} = require('../helpers/jwt')

class Controller {
    static async register (req, res, next) {
        try {
            const {email, password, username} = req.body
            const user = await User.create({email, password, username})
            res.status(201).json({id: user.id, email: user.email, username: user.username})
        } catch (error) {next(error)}
    }

    static async login (req, res, next) {
        try {
            const {username, password} = req.body
            if (!username) throw {name: "is empty", message: "Username is required"}
            if (!password) throw {name: "is empty", message: "Password is required"}
            const users = await User.findOne({where: {username}})
            if (users){
                if (comparePassword(password, users.password)){
                    const access_token = encodeToken({id: users.id})
                    res.status(201).json({message: "Log In Succes", access_token})
                } else throw {name: "Invalid email or password", message: "Invalid email or password"} 
            } else throw {name: "Invalid email or password", message: "Invalid email or password"}
        } catch (error) {next(error)}
    }
}

module.exports = {Controller}