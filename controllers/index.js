const { User, MyBook } = require('../models')
const Mailjet = require('node-mailjet')
const mailjet = new Mailjet.apiConnect(process.env.API_KEY_MAILJET, process.env.SECRET_KEY_MAILJET)

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
                username:
                newUser.username,
                email: newUser.email,
                notification: request.response.data.Messages[0]
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller