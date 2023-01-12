const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.JWTTOKEN;

const genToken = (data) => {
    return jsonwebtoken.sign(data, secret)
}

const verToken = (token) => {
    return jsonwebtoken.verify(token,secret);
}

module.exports = {genToken, verToken};