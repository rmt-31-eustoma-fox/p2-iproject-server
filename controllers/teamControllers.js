const nba = require("../helpers/axios");

class TeamController {
  static async getAllTeams(req, res, next) {
    const { id } = req.query;
    let url = "/teams?league=standard";
    if (id) url += `&id=${id}`;
    try {
      const { data, status } = await nba.get(url);
      if (data.results < 1) throw { name: "teams_not_found" };
      let sendData = data.response;

      if (id) sendData = data.response[0];

      res.status(status).json(sendData);
    } catch (error) {
      next(error);
    }
  }

  static async getTeamDetail(req, res, next) {
    const { id } = req.params;
    let url = `/teams/statistics?season=2022&id=${id}`;
    try {
      const { data, status } = await nba.get(url);
      if (data.results < 1) throw { name: "teams_not_found" };

      res.status(status).json(data.response[0]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TeamController;
