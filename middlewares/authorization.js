const { Favorite } = require('../models');

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findFav = await Favorite.findByPk(id);

    if (!findFav) throw { name: 'NF' };

    const valid = findFav.UserId == req.user.id;

    if (!valid) throw { name: 'FB' };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
