const jwt = require('jsonwebtoken')
const SECRET = 'iProject'
// const SECRET = process.env.SECRET

const signToken = (payload) => jwt.sign(payload, SECRET)

const verifyToken = (token) => jwt.verify(token, SECRET)

module.exports = {
    signToken,
    verifyToken
}