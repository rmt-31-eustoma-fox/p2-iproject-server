var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const hashPassword = (password) => {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

const encodeToken = (token) => {
  return jwt.sign(token, secret)
} 

const decodeToken = (payload) => {
  return jwt.verify(payload, secret)
}

module.exports = {
  hashPassword,
  comparePassword,
  encodeToken,
  decodeToken
}