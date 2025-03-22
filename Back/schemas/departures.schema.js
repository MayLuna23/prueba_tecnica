const Joi = require('joi');


const time = Joi.string().min(3).max(30);
const destiny = Joi.string().min(3).max(30);
const flight = Joi.string().min(6).max(30);
const gate = Joi.string().min(3).max(30);
const remarks = Joi.string().min(3).max(30);


const getDeparturesSchema = Joi.object({
  flight: flight.required(),
});


const createDeparturesSchema = Joi.object({

  flight: flight.required(),
  time: time.required(),
  destiny: destiny.required(),
  gate: gate.required(),
  remarks: remarks.required(),
});

const updateDeparturesSchema = Joi.object({
  remarks,
  gate,
});

module.exports = { getDeparturesSchema, createDeparturesSchema, updateDeparturesSchema };