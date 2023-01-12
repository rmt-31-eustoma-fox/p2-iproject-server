const { Category, Todo, User, Todolist } = require('../models');
const { Op } = require('sequelize');
const CLIENT_ID = process.env['CLIENT_ID'];
const axios = require('axios');
const { jwtSign } = require('../helpers/jwt');
class Today {
  static async addCategory(req, res, next) {
    try {
      const { nameCategory } = req.body;
      const add = await Category.create({ nameCategory });
      res.status(201).json({ statuscode: 200, message: 'category created', data: add });
    } catch (error) {
      next(error);
    }
  }
  static async destroyCategory(req, res, next) {
    try {
      // console.log(req.params);
      const { categoryid } = req.params;

      const destroyCategory = await Category.destroy({ where: { id: categoryid } });
      if (!destroyCategory) {
        throw { name: 'not_found' };
      }
      res.status(201).json({ statuscode: 201, message: 'success delete category' });
    } catch (error) {
      next(error);
    }
  }
  static async getCategory(req, res, next) {
    try {
      const allCategory = await Category.findAll();
      res.status(200).json({ statuscode: 200, data: allCategory });
    } catch (error) {
      next(error);
    }
  }
  static async addTodo(req, res, next) {
    try {
      const { id } = req.user;
      const { role } = req.user;
      const date = new Date();
      const { nameTodo, dateStart, dateEnd, CategoryId, level } = req.body;
      const addData = await Todo.create({ nameTodo, dateStart: date, dateEnd, CategoryId, UserId: id, level, statusTodo: role });
      res.status(201).json({ statuscode: 200, message: 'todo success create', data: addData });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async findTodo(req, res, next) {
    try {
      const { id } = req.user;
      const allTodo = await Todo.findAll({
        where: { UserId: id },
        include: [{ model: User, attributes: { exclude: ['password'] } }, { model: Category }],
        ORDER: ['createdAt', 'DESC'],
      });
      res.status(200).json({ statuscode: 200, data: allTodo });
    } catch (error) {
      next(error);
    }
  }
  static async deleteTodo(req, res, next) {
    try {
      const { todoid } = req.params;
      const deleteTodo = await Todo.destroy({ where: { id: todoid } });
      res.status(201).json({ statuscode: 200, message: 'success delete todo' });
    } catch (error) {
      next(error);
    }
  }
  static async addTodoList(req, res, next) {
    try {
      // console.log(req.user.id, req.params.todoid , req.body.nameList);
      const { id } = req.user;
      const { todoid } = req.params;
      const { nameList } = req.body;
      const addTodoList = await Todolist.create({ nameList, TodoId: todoid, UserId: id, status: 'uncomplete' });
      res.status(200).json({ statuscode: 200, message: 'todolist created success', data: addTodoList });
    } catch (error) {
      // res.status(200).json(error)
      // console.log(error);
      next(error);
    }
  }
  static async getTodolist(req, res, next) {
    try {
      const { todoid } = req.params;
      const { id } = req.user;
      const allTodoById = await Todolist.findAll({
        where: { [Op.and]: [{ TodoId: todoid }, { UserId: id }] },
        include: [{ model: Todo, attributes: { exclude: ['UserId'] } }],
      });
      if (allTodoById.length == 0) {
        throw { name: 'not_found' };
      }
      res.status(200).json({ statuscode: 200, data: allTodoById });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async destroylist(req, res, next) {
    try {
      const { listid } = req.params;
      const listDelete = await Todolist.destroy({ where: { id: listid } });
      res.status(201).json({ statuscode: 200, message: 'success delete list' });
    } catch (error) {
      next(error);
    }
  }
  static async getTodo(req, res, next) {
    try {
      const { todoid } = req.params;
      const getTodo = await Todo.findAll({ where: { id: todoid }, include: [{ model: Todolist }] });
      if (getTodo.length == 0) {
        throw { name: 'not_found' };
      }
      res.status(200).json({ statuscode: 200, data: getTodo });
    } catch (error) {
      next(error);
    }
  }

  static async handleGoogleSignIn(req, res, next) {
    try {
      // console.log(req);
      const googleToken = req.headers['google-oauth-token'];

      ///verivy by google
      const { OAuth2Client, LoginTicket } = require('google-auth-library');
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const { email, name, picture } = ticket.getPayload();
      // console.log(picture);
      const [user, create] = await User.findOrCreate({
        where: { email },
        defaults: {
          fullname: name,
          email,
          password: Math.random().toString(),
          role: 'employer',
          imageUrl: picture,
        },
      });
      res.status(200).json({
        access_token: jwtSign({ id: user.id, role: user.role }),
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      throw error;
    }
  }
  static async updateStatus(req, res, next) {
    try {
      // console.log(req.params);
      const { listid } = req.params;
      const status = await Todolist.update({ status: 'complete' }, { where: { id: listid } });
      res.status(201).json({ statuscode: 201, message: 'success update' });
    } catch (error) {
      // console.log(e);
      next(error);
    }
  }
  static async gempaterbaru(req, res, next) {
    {
      try {
        const dataGempa = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
        res.status(200).json({ data: dataGempa.data });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
module.exports = Today;
