const nba = require("../helpers/axios");

class PlayerController {
  static async searchPlayers(req, res, next) {
    const { search, id } = req.query;
    let url = `/players`;
    if (search) url += `?search=${search}`;
    if (id) url += `?id=${id}`;
    try {
      const { data, status } = await nba.get(url);
      if (data.results < 1) throw { name: "players_not_found" };
      let sendData = {};

      if (search) sendData = data.response;
      if (id) sendData = data.response[0];

      res.status(status).json(sendData);
    } catch (error) {
      next(error);
    }
  }

  static async playerDetails(req, res, next) {
    const { id } = req.params;
    let url = "/players/statistics/?season=2022&id=" + id;
    try {
      const { data, status } = await nba.get(url);
      if (data.results < 1) throw { name: "players_not_found" };

      res.status(status).json(data.response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PlayerController;
