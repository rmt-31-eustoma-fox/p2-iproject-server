const axios = require('axios');
require('dotenv').config();


class News {
    static async getAllNews (req,res,next) {
        try {

            const {data} = await axios({
                url : `https://newsapi.org/v2/everything?q=Movie&from=2023-01-12&sortBy=popularity&apiKey=363635e83cfa45a28855184d22682fbd`,
            })
            // console.log(data);
            let response = data.articles.filter((el,index) =>{
                return index<21
            })
            res.status(200).json(response)
        } catch (error) {
            next (error)
        }
    }

    
    
}


module.exports = News