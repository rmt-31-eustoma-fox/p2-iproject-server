const {Todo} = require("../models")

const authorDelete = async (req, res, next)=>{
    try {
        const {todoid} = req.params
        findId = await Todo.findByPk(todoid)
        if(!findId){
            throw {name: 'not_found'}
        }
        if(findId.UserId != req.user.id){
            throw{name:'forbidden'}
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

const authorPost = async (req, res, next)=>{
    try {
        const {todoid} = req.params
        findId = await Todo.findByPk(todoid)
        if(!findId){
            throw {name: 'not_found'}
        }
        // req.data ={
        //     id : findId
        // }
        if(findId.UserId == req.user.id || findId.statusTodo == 'supervisor' ){
            next()
        } else {
            throw {name: 'not_found'}
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {authorDelete, authorPost}