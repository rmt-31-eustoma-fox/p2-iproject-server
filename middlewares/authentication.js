const { decodeToken } = require("../helpers");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Invalid Token" };
    }

    const payload = decodeToken(access_token);

    const findUser = await User.findByPk(payload.id);

    if (!findUser) {
      throw { name: "Invalid Token" };
    }

    req.user = {
      id: findUser.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;