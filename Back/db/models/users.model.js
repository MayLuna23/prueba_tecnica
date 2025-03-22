const { DataTypes, Model, Sequelize } = require("sequelize");

const USER_TABLE = 'users';

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING(255)
  },
  age: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull:false,
    type: DataTypes.STRING(255),
    unique:true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(255)
  },


}

class User extends Model {

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,

    }
  }
}


module.exports = { USER_TABLE, userSchema, User }