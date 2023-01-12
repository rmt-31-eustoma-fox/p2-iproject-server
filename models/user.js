"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Favorite, { foreignKey: "UserId" });
			User.hasMany(models.Review, { foreignKey: "UserId" });
			// define association here
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				unique: {
					args: true,
					msg: "Email has been registered. Please use another email address.",
				},
				allowNull: false,
				validate: {
					notNull: {
						msg: "Email is required",
					},
					notEmpty: {
						msg: "Email is required",
					},
					isEmail: {
						msg: "Incorrect email format",
					},
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Username is required",
					},
					notEmpty: {
						msg: "Username is required",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Password is required",
					},
					notEmpty: {
						msg: "Password is required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			hooks: {
				beforeCreate: (instance) => {
					instance.password = hashPassword(instance.password);
				},
			},
		}
	);
	return User;
};
