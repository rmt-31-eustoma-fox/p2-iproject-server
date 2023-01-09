const bcrypt = require('bcrypt');

const encryptPassword = (password) => {
    // console.log(password, "ini di helpers");
    return bcrypt.hashSync(password, 10)
}

const comparePassword = (password, userPassword) => {
    // console.log(password, userPassword,"sudah sampai compare password zzzzzzzzzzzzzzzzzzzz");
    return bcrypt.compareSync(password, userPassword)
}

module.exports = {
    encryptPassword,
    comparePassword
}