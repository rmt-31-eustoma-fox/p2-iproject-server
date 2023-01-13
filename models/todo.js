'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User);
      Todo.hasMany(models.Todolist);
      Todo.belongsTo(models.Category);
    }
  }
  Todo.init(
    {
      nameTodo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'name todo is require',
          },
        },
      },
      dateStart: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'date is require',
          },
        },
      },
      dateEnd: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'date End is require',
          },
          isAfter: '2022-01-01',
        },
      },
      CategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: 'category is require',
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User is require',
          },
        },
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'level is require',
          },
        },
      },
      statusTodo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'status Todo is require',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );
  return Todo;
};
