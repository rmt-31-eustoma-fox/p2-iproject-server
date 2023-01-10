const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');
const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: 'IT' };

    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload.id);

    if (!user) throw { name: 'IT' };

    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    if (error.name == 'IT' || error.name == 'JsonWebTokenError') {
      res.status(401).json({
        message: 'Invalid token',
      });
      return;
    }

    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = authentication;
