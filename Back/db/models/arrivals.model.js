const { Model, DataTypes, Sequelize } = require('sequelize');


const  ARRIVALS_TABLE = 'arrivals';

const arrivalsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  
  flight: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },

  time: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },

  origin: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },

  remarks: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },

}

class Arrivals extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ARRIVALS_TABLE,
      modelName: 'Arrivals',
      timestamps: false,

    }
  }
}

module.exports = { Arrivals, arrivalsSchema, ARRIVALS_TABLE};