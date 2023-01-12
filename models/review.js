"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Review.belongsTo(models.User);
			// define association here
		}
	}
	Review.init(
		{
			UserId: DataTypes.INTEGER,
			ShowId: DataTypes.INTEGER,
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Please fill in your review",
					},
					notEmpty: {
						msg: "Please fill in your review",
					},
				},
			},

			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Please fill in the rating",
					},
					notEmpty: {
						msg: "Please fill in the rating",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Review",
		}
	);
	return Review;
};
