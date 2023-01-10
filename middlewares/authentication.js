const { decodeToken } = require("../helpers");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Invalid Token" };
    }

    const payload = decodeToken(access_token);


    if(payload.role !== "customer"){
      throw {name: "forbidden"}
    }


    const findUser = await User.findByPk(payload.id);

    if (!findUser) {
      throw { name: "Invalid Token" };
    }

    req.user = {
      id: findUser.id,
      email: findUser.email,
      role: findUser.role
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;