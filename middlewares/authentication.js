const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
	const { access_token } = req.headers;
	try {
		if (!access_token) {
			throw { name: "InvalidToken" };
		}
		const payload = verifyToken(access_token);
		const user = await User.findByPk(payload.id);
		if (!user) {
			throw { name: "InvalidToken" };
		}
		req.user = {
			id: user.id,
			email: user.email,
		};
		next();
	} catch (error) {
		if (error.name == "InvalidToken" || error.name == "JsonWebTokenError") {
			console.log("masuk error invalid token");
			res.status(401).json({ message: "Invalid token" });
		} else {
			console.log(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
};

module.exports = authentication;
