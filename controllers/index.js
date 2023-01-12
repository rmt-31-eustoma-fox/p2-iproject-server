const { User, Favorite, Review } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
	"5826819359-ouhcvinsfhsa0qhfe0bihk91ap4q6fhe.apps.googleusercontent.com"
);

class Controller {
	static async register(req, res) {
		const { email, password, username } = req.body;
		try {
			const user = await User.create({
				email,
				password,
				username,
			});
			res.status(201).json({ id: user.id, email, username });
		} catch (error) {
			if (
				error.name == "SequelizeValidationError" ||
				error.name == "SequelizeUniqueConstraintError"
			) {
				res.status(400).json({ message: error.errors[0].message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;
		try {
			if (!email) {
				throw { name: "InvalidLogin", code: 400, message: "Email is required" };
			}
			if (!password) {
				throw {
					name: "InvalidLogin",
					code: 400,
					message: "Password is required",
				};
			}
			const user = await User.findOne({ where: { email } });
			if (!user) {
				throw {
					name: "InvalidLogin",
					code: 401,
					message: "Invalid email/password",
				};
			}
			const isValidPassword = comparePassword(password, user.password);
			if (!isValidPassword) {
				throw {
					name: "InvalidLogin",
					code: 401,
					message: "Invalid email/password",
				};
			}
			const access_token = signToken({ id: user.id });
			res.status(200).json({ access_token, username: user.username });
		} catch (error) {
			if (error.name == "InvalidLogin") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	static async googleSignIn(req, res, next) {
		try {
			const { token } = req.headers;
			console.log(req.headers);
			const ticket = await client.verifyIdToken({
				idToken: token,
				audience:
					"5826819359-ouhcvinsfhsa0qhfe0bihk91ap4q6fhe.apps.googleusercontent.com",
			});
			const payload = ticket.getPayload();
			const { name, email } = payload;
			let [user, created] = await User.findOrCreate({
				where: { email },
				defaults: {
					username: name,
					email,
					password: String(Math.random()),
				},
			});
			let message, code;
			if (created) {
				message = `User with email ${created.email} has been created`;
				code = 201;
				user = created;
			} else {
				message = `User with email ${user.email} has been found`;
				code = 200;
			}
			res.status(code).json({
				message,
				access_token: signToken({ id: user.id }),
				username: user.username,
			});
			const userid = payload["sub"];
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async fetchAllShows(req, res) {
		// const genres = req.query.genre
		// console.log(genres)
		const { search, page } = req.query;
		console.log(req.query);
		let url;
		if (search) {
			url = `https://www.episodate.com/api/search?q=${search}&page=${page}`;
		} else {
			url = `https://www.episodate.com/api/most-popular?q=${search}&page=${page}`;
		}
		try {
			const { data } = await axios({
				method: "get",
				url,
			});
			const shows = data.tv_shows;
			res.status(200).json({ shows, count: shows.length });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	static async findShowDetail(req, res) {
		const showId = req.params.id;
		try {
			const { data } = await axios({
				method: "get",
				url: `https://www.episodate.com/api/show-details?q=${showId}`,
			});
			if (!data)
				throw { name: "NotFound", code: 404, message: "TV show not found" };
			res.status(201).json(data.tvShow);
		} catch (error) {
			if (error.name == "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	static async addFavorite(req, res) {
		const showId = req.params.id;
		const userId = req.user.id;
		console.log(showId, userId);
		try {
			const { data } = await axios({
				method: "get",
				url: `https://www.episodate.com/api/show-details?q=${showId}`,
			});
			if (!data)
				throw { name: "NotFound", code: 404, message: "TV show not found" };
			const [favorite, created] = await Favorite.findOrCreate({
				where: {
					UserId: userId,
					ShowId: showId,
				},
				defaults: {
					UserId: userId,
					ShowId: showId,
					status: "Not watched",
				},
			});
			if (!created) {
				res
					.status(200)
					.json({ message: "You had added this show to watchlist" });
			} else {
				const show = data.tvShow;
				res.status(201).json({ message: "Added successfully" });
			}
		} catch (error) {
			if (error.name == "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	static async addReview(req, res) {
		const { content, rating } = req.body;
		const showId = req.params.id;
		const userId = req.user.id;
		try {
			const { data } = await axios({
				method: "get",
				url: `https://www.episodate.com/api/show-details?q=${showId}`,
			});
			// console.log(data);
			if (!data)
				throw { name: "NotFound", code: 404, message: "TV show not found" };

			const [review, created] = await Review.findOrCreate({
				where: {
					UserId: userId,
					ShowId: showId,
				},
				defaults: {
					UserId: userId,
					ShowId: showId,
					content,
					rating,
				},
			});
			if (!created) {
				res.status(200).json({ message: "You have reviewed this movie." });
			} else {
				const show = data.tvShow;
				res.status(201).json({ show, review });
			}
		} catch (error) {
			if (error.name == "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	static async fetchReviews(req, res) {
		const showId = req.params.id;
		const { page } = req.query;
		const limit = 6;
		let offset;
		let option = {
			include: User,
			where: { ShowId: showId },
			limit: limit,
		};
		if (page !== "" && typeof page !== "undefined") {
			offset = page * limit - limit;
			option.offset = offset;
		} else {
			offset = 0;
			option.limit = limit;
			option.offset = offset;
		}
		try {
			const { data } = await axios({
				method: "get",
				url: `https://www.episodate.com/api/show-details?q=${showId}`,
			});
			if (!data)
				throw { name: "NotFound", code: 404, message: "TV show not found" };
			const { count, rows } = await Review.findAndCountAll({
				include: User,
				where: { ShowId: showId },
			});
			const reviews = rows;
			res.status(200).json({ count, reviews });
		} catch (error) {
			if (error.name == "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	// static async updateReview(req, res) {
	// 	const reviewId = req.params.id;
	// 	// const userId = req.user.id;
	// 	const { content, rating } = req.body;
	// 	try {
	// 		const review = await Review.findByPk(reviewId);
	// 		if (!review)
	// 			throw { name: "NotFound", code: 404, message: "TV show not found" };
	// 		await review.set({ content, rating });
	// 		res.status(200).json({ review });
	// 	} catch (error) {
	// 		if (error.name == "NotFound") {
	// 			res.status(error.code).json({ message: error.message });
	// 		} else {
	// 			console.log(error);
	// 			res.status(500).json({ message: "Internal server error" });
	// 		}
	// 	}
	// }

	static async fetchFavorites(req, res) {
		const userId = req.user.id;
		try {
			const favorites = await Favorite.findAll({
				where: {
					UserId: userId,
				},
			});
			let shows = [];
			let promises = [];
			for (let i = 0; i < favorites.length; i++) {
				promises.push(
					axios
						.get(
							"https://www.episodate.com/api/show-details?q=" +
								favorites[i].ShowId
						)
						.then((response) => {
							// do something with response
							shows.push(response.data.tvShow);
						})
				);
			}
			Promise.all(promises).then(() => {
				res.status(200).json({ favorites, shows });
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	static async getFavoriteByShowId(req, res) {
		const showId = req.params.showId;
		const userId = req.user.id;
		try {
			const favorite = await Favorite.findOne({
				where: { ShowId: showId, UserId: userId },
			});
			res.status(200).json({ favorite });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	static async updateFavoriteWatch(req, res) {
		const userId = req.user.id;
		const showId = req.params.showId;
		try {
			const favorite = await Favorite.findOne({
				where: { UserId: userId, ShowId: showId },
			});
			if (!favorite)
				throw { name: "NotFound", code: 404, message: "Show not found" };
			await favorite.update({
				status: "Watched",
			});
			res.status(200).json({ message: "Status has been updated" });
		} catch (error) {
			if (error.name == "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	static async updateFavoriteUnwatch(req, res) {
		const userId = req.user.id;
		const showId = req.params.showId;
		try {
			const favorite = await Favorite.findOne({
				where: { UserId: userId, ShowId: showId },
			});
			if (!favorite)
				throw { name: "NotFound", code: 404, message: "TV show not found" };
			await favorite.update({
				status: "Not watched",
			});
			res.status(200).json({ message: "Status has been updated" });
		} catch (error) {
			if (error.name == "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	static async deleteFavorite(req, res) {
		const showId = req.params.showId;
		const userId = req.user.id;
		try {
			const favorite = await Favorite.findOne({
				where: { UserId: userId, ShowId: showId },
			});
			if (!favorite)
				throw { name: "NotFound", code: 404, message: "TV show not found" };
			const deleted = await Favorite.destroy({
				where: { UserId: userId, ShowId: showId },
			});
			res.status(200).json({ message: "Show has been removed from your list" });
		} catch (error) {
			if (error.name == "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	static async deleteReview(req, res) {
		const reviewId = req.params.id;
		try {
			const review = await Review.findByPk(reviewId);
			if (!review)
				throw { name: "NotFound", code: 404, message: "TV show not found" };
			const deleted = await Review.destroy({
				where: { id: reviewId },
			});
			res.status(200).json({ message: "Show has been removed from your list" });
		} catch (error) {
			if (error.name == "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	static async getQR(req, res) {
		try {
			const generateQRCode = await axios({
				method: "get",
				url: "https://api.happi.dev/v1/qrcode",
				headers: {
					"x-happi-key":
						"0519a3qmHL8G9Z7GT8mVajPXRpZhB3npojIB1PEhhlECJTTf3Wd4v0wx",
					// happikey
				},
				params: {
					data: `https://trakteer.id/albertus%20rheza%20deniswara/tip`,
				},
			});
			const qrCode = generateQRCode.data.qrcode;
			res.status(200).json({ qrCode });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}

module.exports = Controller;
