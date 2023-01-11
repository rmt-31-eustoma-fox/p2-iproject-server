const axios = require('axios');


class Movie {
    static async getAllMovieTrending (req,res,next) {
        try {
            let {mediaType, time, page} = req.query
            // console.log(mediaType, time, page);
            if (mediaType == undefined) {
                mediaType = "movie"
            } else if (mediaType != "all" && mediaType != "movie" && mediaType != "tv" && mediaType != "person") {
                mediaType = "movie"
            } else if (mediaType == "all" || mediaType == "tv" || mediaType == "person") {
                mediaType = 'movie'
            }

            if (time == undefined) {
                time = "day"
            } else if (time != "day" && time != "week") {
                time = "day"
            }

            if (page == undefined) {
                page = 1
            } else if (page > 10 || page <1) {
                page = 1
            }

            // console.log(page);
            const {data} = await axios({
                url : `https://api.themoviedb.org/3/trending/${mediaType}/${time}?api_key=ecdc3d3cff66c04c063d91343c8520f2&page=${page}`,
                // headers : {
                //     access_token: localStorage.getItem("access_token")
                // }
            })
            res.status(200).json(data.results)
        } catch (error) {
            next (error)
        }
    }

    static async getMovieById (req,res,next) {
        try {
            const {movieId} = req.params
            // console.log(movieId);

            const {data} = await axios({
                url : `https://api.themoviedb.org/3/movie/${movieId}?api_key=ecdc3d3cff66c04c063d91343c8520f2`
            })
            // console.log(code);
            const qrcode = await axios({
                url: "https://api.happi.dev/v1/qrcode",
                method: "GET",
                headers: {
                    "x-server-time": 1672793860,
                    "x-ratelimit-remaining": 299,
                    "x-credits-free": 3995,
                    "x-ratelimit-reset": 1672793920,
                    "x-ratelimit-limit": 300,
                    "x-credits-premium": 0,
                    "x-happi-key": "44a1b6vXU9B5JInU2EXK9GZLqCON6z8B5QQEauhw6fx5gxmcW90fPkUo"
                },
                params: {
                    data: data.homepage
                }
            })
            data.qrcode = qrcode.data.qrcode
                res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    } 

    
}


module.exports = Movie