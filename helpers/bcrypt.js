const bcrypt = require('bcryptjs')

const hashPw = (password) => bcrypt.hashSync(password)

const compare = (password, hashed) => bcrypt.compareSync(password, hashed)

module.exports = {
    hashPw,
    compare
}