const {
    signToken
} = require("../helpers/jwt")
const {
    compare
} = require('../helpers/bcrypt')
const {
    User
} = require("../models/index")
const send = require('../helpers/nodemailer')
const {
    OAuth2Client
} = require('google-auth-library');
const {
    CLIENT_ID
} = process.env
const client = new OAuth2Client(process.env.CLIENT_ID);

const LoginWithTwitter = require('login-with-twitter')

const tw = new LoginWithTwitter({
    consumerKey: 'Rrp8d0Vr6s5iInE1KF68a80NU',
    consumerSecret: '6R1o10CzBcMONYQRSwwnmMQa37xLKWI7d91Prtve5CSPfGFwVL',
    callbackUrl: 'http://twitter/callback'
})


class userController {
    static async twitter(req, res, next) {
        try {
            tw.login((err, tokenSecret, url) => {
                if (err) {
                    // Handle the error your way
                }

                // Save the OAuth token secret for use in your /twitter/callback route
                req.session.tokenSecret = tokenSecret

                // Redirect to the /twitter/callback route, with the OAuth responses as query params
                res.redirect(url)
            })
        } catch (error) {

        }
    }

    static async callback(req, res, next) {
        try {
            tw.callback({
                oauth_token: req.query.oauth_token,
                oauth_verifier: req.query.oauth_verifier
            }, req.session.tokenSecret, (err, user) => {
                if (err) {
                    // Handle the error your way
                }

                // Delete the tokenSecret securely
                delete req.session.tokenSecret

                // The user object contains 4 key/value pairs, which
                // you should store and use as you need, e.g. with your
                // own calls to Twitter's API, or a Twitter API module
                // like `twitter` or `twit`.
                // user = {
                //   userId,
                //   userName,
                //   userToken,
                //   userTokenSecret
                // }
                req.session.user = user

                // Redirect to whatever route that can handle your new Twitter login user details!
                res.redirect('/')
            });
        } catch (error) {

        }
    }


    static async register(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body
            let regist = await User.create({
                email,
                password
            })
            send(email)
            res.status(201).json({
                id: regist.id,
                email: regist.email,
                message: `user with email: ${regist.email} has been created`
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body


            if (!email) {
                res.status(400).json({
                    message: "Email is required"
                })
                return
            }
            if (!password) {
                res.status(400).json({
                    message: "Password is required"
                })
                return
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                res.status(401).json({
                    message: "Invalid email/password"
                })
                return
            }

            const valid = compare(password, user.password)

            if (!valid) {
                res.status(401).json({
                    message: "Invalid email/password"
                })
                return
            }

            const access_token = signToken({
                id: user.id
            })

            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async customerSignIn(req, res, next) {
        try {
            // const { access_token } = req.headers["google-auth-token"]
            const token = req.headers["google-auth-token"]
            console.log(token);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            console.log(payload);
            let {
                name,
                email
            } = payload

            let find = await User.findOne({
                where: {
                    email: email
                }
            })

            console.log(find, "find");
            let message, code, id, role, access_token;
            if (find) {
                code = 200
                message = `User with ${find.email} has been found`
                id = find.id
                role = find.role
                email = find.email
                access_token = signToken({
                    id
                })

            } else {
                let create = await User.create({
                    email,
                    password: String(Math.random()),
                    role: 'Customer'
                })
                code = 201
                message = `User with ${create.email} has been created`
                id = create.id
                role = create.role
                email = create.email
                access_token = signToken({
                    id
                })
            }

            res.status(code).json({
                message,
                access_token,
                id,
                role,
                email,
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = userController