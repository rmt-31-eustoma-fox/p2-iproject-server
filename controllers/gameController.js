const nba = require("../helpers/axios");

class GameController {
  static async fetchNowGames(req, res, next) {
    let now = new Date().toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    let url = `/games?date=${now}`;
    try {
      const { data, status } = await nba.get(url);
      if (data.results < 1) throw { name: "games_not_found" };

      res.status(status).json(data.response);
    } catch (error) {
      next(error);
    }
  }

  static async fetchGameDetails(req, res, next) {
    const { id } = req.params;
    let url = `/games/statistics?id=${id}`;
    try {
      const { data, status } = await nba.get(url);
      if (data.results < 1) throw { name: "Games_not_found" };

      res.status(status).json(data.response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GameController;
