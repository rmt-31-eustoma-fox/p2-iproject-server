'use strict';
const {hashPassword} = require('../helpers/bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {onDelete: "cascade", onUpdate: "cascade"})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Email is required"
        },
        notEmpty: {
          msg : "Email is required"
        },
        isEmail: {
          msg: "Email is required"
        }
      },
      unique: {
        args: true,
        msg: "Email has been taken"
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Username is required"
        },
        notEmpty: {
          msg : "Username is required"
        }
      },
      unique: {
        args: true,
        msg: "Username has been taken"
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
        len: {
          args: [5,24],
          msg: "Password must between 5 and 24"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        let hash = hashPassword(user.password)
        user.password = hash
      }
    }
  });
  return User;
};