const bcryptjs = require('bcryptjs');

const encryptPass = (pass) => {
    return bcryptjs.hashSync(pass,10);
}

const checkPass = (storePass, pass) => {
    return bcryptjs.compareSync(pass, storePass);
}

module.exports = {encryptPass, checkPass};