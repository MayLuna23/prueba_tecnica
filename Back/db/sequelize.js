const { Sequelize } = require('sequelize');
const {infoBd} = require('./config');
const setupModels = require("./models/index")
//el bloque de conexion a la bd
const sequelize = new Sequelize(infoBd.dbName, infoBd.dbUser, infoBd.dbPassword, {
  host: infoBd.dbHost,
  port: infoBd.port,
  dialect: 'mysql',
  logging: true, // Cambiar a 'console.log' si necesitas ver las consultas ejecutadas
  underscored: true,
});

// Probar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
})();

setupModels(sequelize)

module.exports = sequelize;
