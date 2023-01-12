const { jwtVerivy } = require('../helpers/jwt');
const { User } = require('../models');

const autentification = async (req, res, next) => {
  try {
    // console.log(req.headers.access_token);
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: 'invalid_token' };
    }
    const dataToken = jwtVerivy(access_token);
    const findId = await User.findByPk(dataToken.id);
    if (!findId) {
      throw { name: 'invalid_token' };
    }
    req.user = {
      id: findId.id,
      username: findId.fullname,
      role: findId.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = autentification;
