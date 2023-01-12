const axios = require("axios");

class Controller {
  static async translate(req, res, next) {
    try {
      const { text } = req.body;
      console.log("masuk");
      const data = await axios({
        method: "POST",
        url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "9c9b6d5da6msh19b0e7b41b003f5p168951jsn4a35fd16d0e0",
          "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
        },
        data: {
          "from": "id",
          "to": "en",
          "e": "",
          "q": [text]
      },
      });
      const translated = data.data;
      console.log(translated)
      res.status(200).json({translatedText: translated[0]});
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
