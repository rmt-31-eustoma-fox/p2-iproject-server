const Index = require('../controllers');
const Today = require('../controllers/today');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

router.get('/', Today.findTodo);
router.post('/todo', Today.addTodo);
router.post('/todo/:todoid/todolist', authorization, Today.addTodoList);
router.patch('/todo/:todoid/todolist/:listid', authorization, Today.updateStatus);
router.delete('/todo/:todoid/todolist/:listid', authorization, Today.destroylist);
router.delete('/todo/:todoid', authorization, Today.deleteTodo);
router.post('/category', Today.addCategory);
router.get('/category', Today.getCategory);
router.delete('/category/:categoryid', Today.destroyCategory);

router.get('/todo/:todoid', Today.getTodo);

router.get('/todo/:todoid/todolist', Today.getTodolist);

router.get('/geolocation', Today.geolocation);
router.get('/gempa', Today.gempaterbaru);

module.exports = router;
