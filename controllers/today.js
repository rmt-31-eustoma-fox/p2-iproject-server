const { Category} = require('../models')
class Today{
    static async addCategory(req, res, next){
        try {
            const {nameCategory} = req.body
            const add = await Category.create({nameCategory}) 
            res.status(201).json({statuscode:200, message:'category created', data:add})
        } catch (error) {
            next(error)
        }
    }
    static async destroyCategory(req, res, next){
        try {
            const{categoryid}= req.params
            const destroyCategory = await Category.destroy({where:{id:categoryid}}) 
            if(!destroyCategory){
                throw {name: 'not_found'}
            }
            res.status(201).json({statuscode:201, message:'success delete category'})
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Today