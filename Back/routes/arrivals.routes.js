const express = require('express');

const {ArrivalsService} = require('../services/arrivals.service');
const {validatorHandler} = require('../middlewares/validator.handler');
const {
  createArrivalsSchema,
  getArrivalsSchema,
  updateArrivalsSchema,


} = require('../schemas/arrivals.schema');

const router = express.Router();
const Aservice = new ArrivalsService();

router.get('/',

  async (req, res, next) => {
  try {
    const respuesta = await Aservice.getAllArrivals()
    res.status(respuesta.statusCode).json(respuesta);
  } catch (error) {
    console.error(error.message)
    next(error);
  }
});



router.post('/',
  validatorHandler(createArrivalsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body)
      const respuesta = await Aservice.createArrivals(body)
      res.status(respuesta.statusCode).json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);


router.patch('/:flight',

  async (req, res, next) => {
    try {
      const { flight } = req.params;
      const changes = req.body;
      const result = await Aservice.updateOneArrivals(flight, changes);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:flight',
  async (req, res, next) => {
    try {
      const { flight } = req.params;
      const respuesta = await Aservice.deleteArrivals(flight);
      res.status(respuesta.statusCode).json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;