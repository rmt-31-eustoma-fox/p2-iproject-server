const { Todo } = require('../models');

const authorization = async (req, res, next) => {
  try {
    // console.log(req.params);
    const { todoid } = req.params;
    findId = await Todo.findByPk(todoid);
    if (!findId) {
      throw { name: 'not_found' };
    }
    // console.log(findId.UserId, req.user.id);
    if (findId.UserId != req.user.id) {
      throw { name: 'forbidden' };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
