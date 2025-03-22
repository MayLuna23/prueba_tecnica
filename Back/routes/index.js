const express = require('express');



const arrivalsRouter = require('./arrivals.routes');
const departuresRouter = require('./departures.routes');
const usersRouter = require('./users.routes');
const authRouter = require('./auth.routes');


function routerApi(app) {

  const router= express.Router();

  app.use('/api-flights/v1',router);





  router.use('/arrivals', arrivalsRouter);
  router.use('/departures', departuresRouter);
  router.use('/users', usersRouter);

  router.use('/login', authRouter);





}

module.exports = routerApi;