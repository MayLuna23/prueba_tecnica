const { Model, DataTypes, Sequelize } = require('sequelize');


const DEPARTURES_TABLE = 'departures';

const departuresSchema = {
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

  destiny: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },

  gate: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },

  remarks: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },

}

class Departures extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: DEPARTURES_TABLE,
      modelName: 'Departures',
      timestamps: false,
    }
  }
}

module.exports = { Departures, departuresSchema, DEPARTURES_TABLE };