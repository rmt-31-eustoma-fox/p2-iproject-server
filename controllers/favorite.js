require('dotenv').config();
const { default: axios } = require("axios")
const { Favorite } = require("../models")



class FavoriteController {
    static async addMovieToFavorite(req, res, next) {
        try {
            // const data =
            // {
            //     UserId: req.body.UserId,
            //     externalId: req.body.externalId
            // }
            const { externalId } = req.params
            const data = await Favorite.create({
                UserId: req.user.id,
                externalId: externalId
            })
            // console.log(req.user.id,"ini req user id");
            // console.log(UserId,"<<<<<<<<<<ini user id");
            // console.log(externalId,"<<<<<<< ini external id");
            // console.log(data);
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getAllDataFavorite(req, res, next) {
        try {
            const favorite = await Favorite.findAll({
                where: {
                    UserId: req.user.id
                }
            })

            // const favoritList = favorite.map((el) => {
            //    axios({
            //     url : `https://api.themoviedb.org/3/movie/${el.externalId}?api_key=ecdc3d3cff66c04c063d91343c8520f2`
            //    })

            // })
            let favList = []
            for (let i = 0; i < favorite.length; i++) {
                // console.log(favorite[i].externalId);
                let favoriteList = await axios({
                    url: `https://api.themoviedb.org/3/movie/${favorite[i].externalId}?api_key=${process.env.TMDB_API_KEY}`
                })
                // console.log(favoriteList.data,"iniii isi favorite list");
                favList.push(favoriteList.data)
            }
            // console.log(favList);

            res.status(200).json(favList)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = FavoriteController