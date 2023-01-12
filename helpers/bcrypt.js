const bcrypt = require("bcryptjs");

function hashPassword(password) {
	const salt = bcrypt.genSaltSync(12);
	return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hash) {
	return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, comparePassword };