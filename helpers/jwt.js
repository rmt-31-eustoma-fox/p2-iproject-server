const jwt = require('jsonwebtoken');
const key = "rahasia"
const encodeToken = (payload) => {
    return jwt.sign(payload, key)
}

const decodeToken = (token) => {
    return jwt.verify(token, key)
}

module.exports = {
    encodeToken,
    decodeToken
}