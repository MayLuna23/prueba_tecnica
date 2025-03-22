const express = require('express');
const app = express();
const port = 3001;
const sequelize =require('./db/sequelize')
const routerApi = require ('./routes');
const cors = require('cors');
const{logErrors,errorHandler, boomErrorHandler,ormErrorHandler} =require('./middlewares/error.handler');
const passport = require('passport');
require('./auth');

const corsOptions = {
  origin: 'http://localhost:5173', // Solo permitir este dominio
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome to my API');
});

app.listen(port, () => {
  console.log('Mi port' + port);
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use(passport.initialize());
routerApi(app);