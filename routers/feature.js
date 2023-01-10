const Today = require('../controllers/today')
const {authorDelete, authorPost} = require('../middlewares/authorization')

const router = require('express').Router()

router.post('/category', Today.addCategory)
router.get('/category', Today.getCategory)
router.delete('/category/:categoryid', Today.destroyCategory)
router.get('/todo',Today.findTodo)
router.post('/todo', Today.addTodo)
router.delete('/todo/:todoid', authorDelete, Today.deleteTodo)
router.post('/todo/:todoid/todolist',authorPost, Today.addTodoList )
router.get('/todo/:todoid/todolist',Today.getTodolist)
router.delete('/todo/:todoid/todolist/:listid',authorDelete, Today.destroylist)



module.exports = router