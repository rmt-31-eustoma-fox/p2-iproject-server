const axios = require('axios');
require('dotenv').config();


class News {
    static async getAllNews (req,res,next) {
        try {
            // let {mediaType, time, page} = req.query
            // // console.log(mediaType, time, page);
            // if (mediaType == undefined) {
            //     mediaType = "movie"
            // } else if (mediaType != "all" && mediaType != "movie" && mediaType != "tv" && mediaType != "person") {
            //     mediaType = "movie"
            // } else if (mediaType == "all" || mediaType == "tv" || mediaType == "person") {
            //     mediaType = 'movie'
            // }

            // if (time == undefined) {
            //     time = "day"
            // } else if (time != "day" && time != "week") {
            //     time = "day"
            // }

            // if (page == undefined) {
            //     page = 1
            // } else if (page > 10 || page <1) {
            //     page = 1
            // }

            // console.log(page);
            const {data} = await axios({
                url : `https://newsapi.org/v2/everything?q=Movie&from=2023-01-12&sortBy=popularity&apiKey=363635e83cfa45a28855184d22682fbd`,
                // headers : {
                //     access_token: localStorage.getItem("access_token")
                // }
            })
            console.log(data);
            res.status(200).json(data.articles)
        } catch (error) {
            next (error)
        }
    }

    
    
}


module.exports = News