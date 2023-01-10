const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashPw = (pw) => {
    return bcrypt.hashSync(pw)
}

const comparePw = (pw, hashedPwd) => {
    return bcrypt.compareSync(pw, hashedPwd)
}

const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { hashPw, comparePw, signToken, verifyToken }