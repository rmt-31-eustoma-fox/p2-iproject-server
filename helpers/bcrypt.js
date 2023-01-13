const bcrypt = require('bcryptjs')

function hashPassword(datapass){
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(datapass, salt)
    return hash
}

function comparePassword(datapass, hash){
    return bcrypt.compareSync(datapass, hash)
}

module.exports = {hashPassword, comparePassword}