const express = require('express');

const {DeparturesService} = require('../services/departures.service');
const {validatorHandler} = require('../middlewares/validator.handler');
const {
  createDeparturesSchema,
  getDeparturesSchema,
  updateDeparturesSchema,


} = require('../schemas/departures.schema');

const router = express.Router();
const Aservice = new DeparturesService();

router.get('/',

  async (req, res, next) => {
  try {
    const respuesta = await Aservice.getAllDepartures()
    res.status(respuesta.statusCode).json(respuesta);
  } catch (error) {
    console.error(error.message)
    next(error);
  }
});



router.post('/',
  validatorHandler(createDeparturesSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body)
      const respuesta = await Aservice.createDepartures(body)
      res.status(respuesta.statusCode).json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);


router.patch('/:flights',

  async (req, res, next) => {
    try {
      const { flights } = req.params;
      const changes = req.body;
      const result = await Aservice.updateOneDepartures(flights, changes);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:flights',
  async (req, res, next) => {
    try {
      const { flights } = req.params;
      const respuesta = await Aservice.deleteDepartures(flights);
      res.status(respuesta.statusCode).json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;