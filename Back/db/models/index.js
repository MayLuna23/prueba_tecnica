

const {Arrivals, arrivalsSchema} = require('./arrivals.model')
const {Departures, departuresSchema} = require('./departures.model')
const { User, userSchema } = require('./users.model');


function setupModels(sequelize) {

  Departures.init(departuresSchema, Departures.config(sequelize));
  Arrivals.init(arrivalsSchema, Arrivals.config(sequelize));
  User.init(userSchema, User.config(sequelize));



}

module.exports = setupModels;
