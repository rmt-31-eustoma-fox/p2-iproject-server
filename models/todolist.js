'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todolist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todolist.belongsTo(models.Todo)
      Todolist.belongsTo(models.User)
    }
  }
  Todolist.init({
    nameList: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: 'namelist is require'
        }
      }
    },
    TodoId: {
      allowNull:false,
      type: DataTypes.INTEGER,
      validate:{
        notNull:{
        msg:'Todo Id is require'
       }
      }
    },
    UserId: {
      allowNull:false,
      type: DataTypes.INTEGER,
      validate:{
        notNull:{
        msg:'User Id is require'
      }
      }
    },
  }, {
    sequelize,
    modelName: 'Todolist',
  });
  return Todolist;
};