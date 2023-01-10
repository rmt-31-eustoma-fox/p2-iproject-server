const { User, MyBook } = require('../models')
const Mailjet = require('node-mailjet')
const { comparePw, signToken } = require('../helpers')
const mailjet = new Mailjet.apiConnect(process.env.API_KEY_MAILJET, process.env.SECRET_KEY_MAILJET)
const axios = require('axios')

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
                "Subject": "Hai, good readers.",
                "TextPart": "My first Mailjet email",
                "HTMLPart": `<h3>Dear ${username}, welcome to GarageReading</a>!</h3><br />Hope you get new insight`,
                "CustomID": `user${newUser.id}`
                }
            ]
            })
           
            res.status(201).json({
                id: newUser.id,
                username: newUser.username,
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
                name: user.username
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
                    "Subject": "Hai, good readers.",
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": `<h3>Dear ${name}, welcome to GarageReading</a>!</h3><br />Hope you get new insight`,
                    "CustomID": `user${user.id}`
                    }
                ]
            })

            res.status(200).json({
                access_token: signToken({id: user.id}),
                name: user.username
            })
        } catch (err) {
            next(err)
        }
    }

    static async getBooks(req, res, next){
        try {
            const { query } = req.query
            const { data } = await axios({
                method: "GET",
                url: `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&filter=paid-ebooks&maxResults=40`
            })
            // console.log(books.data, '<<<<<<< cek');
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller