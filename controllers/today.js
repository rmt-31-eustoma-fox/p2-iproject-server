const { Category, Todo, User, Todolist} = require('../models')
const {Op, json, where} = require('sequelize')
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
    static async getCategory(req, res, next){
        try {
            const allCategory = await Category.findAll()
            res.status(200).json({statuscode:200, data:allCategory})
        } catch (error) {
            next(error)
        }
    }
    static async addTodo(req, res, next){
        try {
            const {id} = req.user
            const {role} = req.user
            const date = new Date()
            const {nameTodo, dateStart, dateEnd, CategoryId, level} = req.body
            const addData = await Todo.create({nameTodo, dateStart:date, dateEnd, CategoryId,UserId:id,level,statusTodo:role})
            res.status(201).json({statuscode:200, message:'todo success create', data:addData})
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
    static async findTodo(req, res, next){
        try {
            const{id} = req.user
            const allTodo = await Todo.findAll({where:{
                [Op.or]:[{UserId:id},{statusTodo:'supervisor'}]
            },
        include:[{model:User, attributes:{ exclude:['password']}},{model:Category}],
        ORDER:['createdAt','DESC']
        })
            res.status(200).json({statuscode:200, data:allTodo})
        } catch (error) {
            next(error)
        }
    }
    static async deleteTodo(req, res, next){
        try {
            const {todoid} = req.params
            const deleteTodo = await Todo.destroy({where:{id:todoid}})
            res.status(201).json({statuscode:200, message: 'success delete todo'})
        } catch (error) {
            next(error)
        }
    }
    static async addTodoList(req, res, next){
        try {
            // console.log(req.user.id, req.params.todoid , req.body.nameList);
            const {id} = req.user
            const {todoid} = req.params
            const {nameList} = req.body
            const addTodoList = await Todolist.create({nameList, TodoId:todoid, UserId:id})
            res.status(200).json({statuscode:200, message:'todolist created success', data:addTodoList}) 
        } catch (error) {
            // res.status(200).json(error)
            console.log(error);
            next(error)
        }
    }
    static async getTodolist(req, res, next){
        try {
            const {todoid} = req.params
            const {id} = req.user
            const allTodoById = await Todolist.findAll({
                where:{[Op.and]:[{TodoId:todoid},{UserId:id}]},
                include:[{model:Todo, attributes:{exclude:['UserId']}},{model:User, attributes:{exclude:['password']}}]
            })
            if(allTodoById.length == 0){
                throw{name:'not_found   '}
            }
            res.status(200).json({statuscode:200, data:allTodoById})
        } catch (error) {
            next(error)
        }
    }
    static async destroylist(req, res, next){
        try {
            const {listid} = req.params
            const listDelete = await Todolist.destroy({where:{id: listid}})
            res.status(201).json({statuscode:200, message:'success delete list'})
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Today