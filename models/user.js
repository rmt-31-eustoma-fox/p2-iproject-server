'use strict';
const {
  Model
} = require('sequelize');
const { hashPw } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MyBook)
      User.hasMany(models.Order)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required' },
        notEmpty: { msg: 'Name is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email is required' },
        notEmpty: { msg: 'Email is required' },
        isEmail: { args: true, msg: 'Invalid format email' },
        isUnique(value, next){
          User.findAll({
            where: {email: value},
            attributes: ['id']
          })
          .then(user => {
            if(user.length != 0) next(new Error('Email already in use!'))
            next()
          })
          .catch(error => next(error))
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
        notEmpty: { msg: 'Password is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook("beforeCreate", user => {
    user.password = hashPw(user.password)
  })
  
  return User;
};