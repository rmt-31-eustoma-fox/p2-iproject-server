const { default: axios } = require("axios");
const { Currency } = require("../models");

class Controller {
  static async getAllCurrency(req, res, next) {
    // res.json({message : 'List all currency'})
    try {
      const { data } = await axios({
        method: "get",
        url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols",
        headers: {
          "X-RapidAPI-Key":
            "456d727bc2msh92dec82df95eaa3p1c867djsn3d1b68e43101",
          "X-RapidAPI-Host":
            "currency-conversion-and-exchange-rates.p.rapidapi.com",
        },
      });

      const { symbols } = data;
      const reFactorData = [];

      for (const code in symbols) {
        const temp = {
          symbol: code,
          name: symbols[code],
        };
        reFactorData.push(temp);
      }

      res.status(200).json(reFactorData);
    } catch (error) {
      next(error);
    }
  }
  static async getForexNews(req, res, next) {
    try {
      const { forexPair } = req.query;
      // console.log(forexPair.replaceAll('/',''))
      const { data } = await axios({
        method: "get",
        url: "https://api.stockdata.org/v1/news/all",
        params: {
          symbols: forexPair.replaceAll("/", ""),
          filter_entities: true,
          language: "en",
          api_token: "rSlEQ1WtCN739GyIgaZ0YEqtVCCjCCx6VBXZhMPF",
        },
      });

      const objReturned = data.data.map((el) => {
        const returnObj = {
          title: el.title,
          desc: el.description,
          imgUrl: el.image_url,
          createdAt: new Date(el.published_at).toLocaleDateString("en-EN", {
            dateStyle: "medium",
          }),
          source: el.source,
          url: el.url,
        };
        return returnObj;
      });

      res.status(200).json(objReturned);
    } catch (error) {
      next(error);
    }
  }
  static async getForexPairValue(req, res, next) {
    try {
      const { forexPair } = req.query;
      // console.log(forexPair)
      const { data } = await axios({
        method: "get",
        url: "https://twelve-data1.p.rapidapi.com/time_series",
        params: {
          symbol: forexPair,
          interval: "1day",
          outputsize: "30",
          format: "json",
        },
        headers: {
          "X-RapidAPI-Key":
            "456d727bc2msh92dec82df95eaa3p1c867djsn3d1b68e43101",
          "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
        },
      });

      const { values } = data;

      const returnObj = values.map((el) => {
        const tempObj = {
          time: el.datetime,
          open: parseFloat(el.open),
          high: parseFloat(el.high),
          low: parseFloat(el.low),
          close: parseFloat(el.close),
        };
        return tempObj;
      });

      returnObj.reverse();

      res.status(200).json(returnObj);
    } catch (error) {
      next(error);
    }
  }
  static async getExchangeRatio(req, res, next){
    try {
        const { forexPair } = req.query;
        const symbol = forexPair.split('/')[0]
        const {data} = await axios({
            method: 'get',
            url: 'https://anyapi.io/api/v1/exchange/rates',
            params : {
                base : symbol,
                apiKey : 'bvild86tlhgq3entq0b4c8ajqbvdspk2gud8o5rng0dgo1qe5jt333o'
            }
        })

        const updatedAt = (new Date(data.lastUpdate*1000))
        const {base, rates} = data
        const Pair = []
        for(const quote in rates){
            if(base !== quote){
                const name = `${base}/${quote}`
                const value = rates[quote]
                Pair.push({name,value})
            }
            // Pair.push({`${base}/${quote}` : rates[quote]})
        }

        const finalReturn = {updatedAt, Pair}

        res.status(200).json(finalReturn)
    } catch (error) {
        next(error)
    }
  }
}

module.exports = Controller;
