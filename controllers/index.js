const { comparePassword } = require('../helpers/bcrypt');
const { jwtSign } = require('../helpers/jwt');
const {User} = require('../models')
class Index{
    static async register(req, res, next){
        try {
        const {fullname, email, password, imageUrl,role } = req.body
        const regUser = await User.create({fullname, email, password, imageUrl, role:'employer'})
        res.status(201).json({
            statuscode:201,
            id: regUser.id, name:regUser.fullname ,email: regUser.email})            
        } catch (error) {
         next(error);   
        }
    }
    static async regSpv(req, res, next){
        try {
            const {fullname, email, password, imageUrl } = req.body
            const regspv = await User.create({fullname, email, password, imageUrl, role:'supervisor'})
            res.status(201).json({
                statuscode:201,
                id: regspv.id, name:regspv.fullname ,email: regspv.email})
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next){
        try {
            const {email, password} = req.body
            if(!email || email==''){
                res.status(400).json({message:'email is require'})
            }
            if(!password || password==''){
                res.status(400).json({message:'password is require'})
            }
            const logUser = await User.findOne({where:{email}})
            if(!logUser){
                throw{name:'invalid_data'}
            }
            if(!comparePassword(password, logUser.password)){
                throw {name:'invalid_data'}
            }
            const token =  jwtSign({id: logUser.id, username: logUser.fullname, role: logUser.role})
            res.status(201).json({statuscode:201, access_token:token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Index