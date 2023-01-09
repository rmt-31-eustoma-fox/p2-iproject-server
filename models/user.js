'use strict';
const {
  Model
} = require('sequelize');
const { encryptPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite)
    }
  }
  User.init({
    id : {
      type : DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey : true
    },
    email: {
      type: DataTypes.STRING,
      unique : {msg : "Email must be unique"},
      allowNull: false,
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Invalid email format" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password is required" }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" }
      }
    },
    role : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Role is required" },
        notEmpty: { msg: "Role is required" }
      }
    },
  }, {
    sequelize,
    hooks : {
      beforeCreate: (user , options) => {
        user.password = encryptPassword(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};