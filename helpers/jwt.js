const jwt = require('jsonwebtoken')
const SASUKEEENARUTOOOO = "GundamStrikeFreedom"

const encodeToken = (payload) => {
    return jwt.sign(payload, SASUKEEENARUTOOOO)
}

const decodeToken = (token) => {
    return jwt.verify(token, SASUKEEENARUTOOOO)
}

module.exports = {encodeToken, decodeToken}