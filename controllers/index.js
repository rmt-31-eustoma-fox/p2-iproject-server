const { User, MyBook } = require('../models')
const Mailjet = require('node-mailjet')
const { comparePw, signToken } = require('../helpers')
const mailjet = new Mailjet.apiConnect(process.env.API_KEY_MAILJET, process.env.SECRET_KEY_MAILJET)
const axios = require('axios')
const { Op } = require('sequelize')
const {OAuth2Client, UserRefreshClient} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const midtransClient = require('midtrans-client');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);

class Controller{
    static async register(req, res, next){
        try {
            const { username, email, password } = req.body
            const newUser = await User.create({ username, email, password })

            const request = await mailjet
            .post("send", {'version': 'v3.1'})
            .request({
            "Messages":[
                {
                "From": {
                    "Email": "erissusanto997@gmail.com",
                    "Name": "Eris"
                },
                "To": [
                    {
                    "Email": email,
                    "Name": username
                    }
                ],
                "Subject": "Hai, good reader.",
                "TextPart": "My first Mailjet email",
                "HTMLPart": `<h3>Dear ${username}, welcome to Reading Shed</a>!</h3><br />Hope you get new insight`,
                "CustomID": `user${newUser.id}`
                }
            ]
            })
           
            res.status(201).json({
                access_token: signToken({id: newUser.id}),
                id: newUser.id,
                name: newUser.username,
                email: newUser.email,
                notification: request.response.data.Messages[0]
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            const { email, password } = req.body
            if(!email) throw {name: "RequiredDataLog" }
            if(!password) throw {name: "RequiredDataLog" }

            const user = await User.findOne({ where: { email } })
            if(!user) throw { name: "InvalidLog" }

            const validPwd = comparePw(password, user.password)
            if(!validPwd) throw { name: "InvalidLog" }

            res.status(200).json({
                access_token: signToken({id: user.id}),
                name: user.username,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async loginByGoogle(req, res, next){
        try {
            const token = req.headers["google-oauth-token"]

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });
            const {name, email} = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: {email},
                defaults: {
                    username: name,
                    email,
                    password: "google"
                },
                hooks: false
            })

            await mailjet.post("send", {'version': 'v3.1'}).request({
                "Messages":[
                    {
                    "From": {
                        "Email": "erissusanto997@gmail.com",
                        "Name": "Eris"
                    },
                    "To": [
                        {
                        "Email": email,
                        "Name": name
                        }
                    ],
                    "Subject": "Hai, good reader.",
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": `<h3>Dear ${name}, welcome to Reading Shed</a>!</h3><br />Hope you get new insight`,
                    "CustomID": `user${user.id}`
                    }
                ]
            })

            res.status(200).json({
                access_token: signToken({id: user.id}),
                name: user.username,
                email: user.email
            })
        } catch (err) {
            next(err)
        }
    }

    static async getBooks(req, res, next){
        try {
            const { query } = req.query
            if(!query) throw {name: "RequiredDataQuery"}

            const { data } = await axios({
                method: "GET",
                url: `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=paid-ebooks&maxResults=40`
            })

            if(data.totalItems == 0) throw {name: "DataNotFound"}

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getQuotes(req, res, next){
        try {
            let category = "inspirational"
            const { data } = await axios({
                method: "GET",
                url: "https://api.api-ninjas.com/v1/quotes?category=" + category,
                headers: {
                    'X-Api-Key': process.env.NINJA_API_KEY
                  }
            })

            res.status(200).json(data[0])
        } catch (error) {
            next(error)
        }
    }

    static async addMyBook(req, res, next){
        try {
            const oldMyBook = await MyBook.findAll({
                where: {
                    [Op.and]: [{ UserId: req.user.id }, { code: req.body.code }]
                }
            })

            if(oldMyBook.length != 0) throw {name: "DuplicateMyBook"}

            const currency = await axios({
                method: 'GET',
                url: 'https://currency-exchange.p.rapidapi.com/exchange',
                params: {from: 'USD', to: 'IDR', q: req.body.price},
                headers: {
                  'X-RapidAPI-Key': 'cac728165dmsh6972b6acff9e936p10ac85jsn408d4f3bcf48',
                  'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
                }
              })

            //   console.log(currency.data, '<<<< cek price');

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MIDTRANS_SK
            });

            let parameter = {
                "transaction_details": {
                    "order_id": req.body.code,
                    "gross_amount": Math.round(currency.data)
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "first_name": req.user.name,
                    "email": req.user.email,
                }
            };
         
            const midtrans = await snap.createTransaction(parameter)
            // console.log(midtrans.token, '<<<< token ok');

            req.body.UserId = req.user.id
            const newMyBook = await MyBook.create(req.body)

            const mybook = await MyBook.findByPk(newMyBook.id, {attributes: {exclude: ['createdAt', 'updatedAt']}})

            res.status(201).json(midtrans)
        } catch (error) {
            next(error)
        }
    }

    static async getMyBooks(req, res, next){
        try {
            const mybooks = await MyBook.findAll({
                where: {UserId: req.user.id},
                order: [['id', 'asc']]
            })

            res.status(200).json(mybooks)
        } catch (error) {
            next(error)
        }
    }

    static async updateReading(req, res, next){
        try {
            await MyBook.update({status: req.book.status}, {where: {id: req.params.id}})

            res.status(200).json({message: "Reading progress has been updated"})
        } catch (error) {
            next(error)
        }
    }

    static async getMyBookById(req, res, next){
        try {
            const mybook = await MyBook.findByPk(req.params.id, {attributes: {exclude: ['createdAt', 'updatedAt']}})

            res.status(200).json(mybook)
        } catch (error) {
            next(error)
        }
    }

    static async getNews(req, res, next){
        try {
            const news = await newsapi.v2.topHeadlines({
                q:'science',
                category: 'science',
                language: 'en',
            })

            res.status(200).json(news)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller