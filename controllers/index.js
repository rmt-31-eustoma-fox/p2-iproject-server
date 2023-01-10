const axios = require('axios');
class Controller {
  static async agents(req, res, next) {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://valorant-api.com/v1/agents',
      });

      const mappedData = data.data
        .filter((el) => el.isPlayableCharacter == true)
        .map((el) => {
          return {
            id: el.uuid,
            name: el.displayName,
            desc: el.description,
            imageUrl: el.fullPortrait,
            role: el.role,
            abilities: el.abilities,
          };
        });

      res.status(200).json(mappedData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
