const nba = require("../helpers/axios");

class StandingController {
  static async getStandingBySeasons(req, res, next) {
    const { season } = req.query;
    let url = "/standings?league=standard&season=" + season;
    try {
      const { data, status } = await nba.get(url);
      if (data.results < 1) throw { name: "standings_not_found" };

      res.status(status).json(data.response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StandingController;
