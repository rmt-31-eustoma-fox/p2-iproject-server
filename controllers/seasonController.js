const nba = require("../helpers/axios");

class SeasonController {
  static async getAllSeasons(req, res, next) {
    try {
      const { data, status } = await nba.get("/seasons");

      res.status(status).json(data.response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SeasonController;
