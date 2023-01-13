const jwt = require('jsonwebtoken')
const kodebos = process.env.JWT_SECRET

function jwtSign(payload){
    return jwt.sign(payload, kodebos)
}

function jwtVerivy(token){
    return jwt.verify(token, kodebos)
}

module.exports= {jwtSign, jwtVerivy}