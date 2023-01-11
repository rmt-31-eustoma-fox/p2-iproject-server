const axios = require("axios");

const nba = axios.create({
  baseURL: "https://api-nba-v1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": process.env.X_API_KEY,
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
  },
});

module.exports = nba;
