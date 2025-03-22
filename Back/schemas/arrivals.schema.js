const Joi = require('joi');


const time = Joi.string().min(3).max(30);
const origin = Joi.string().min(3).max(30);
const flight = Joi.string().min(6).max(30);
const remarks = Joi.string().min(3).max(30);


const getArrivalsSchema = Joi.object({
  flight: flight.required(),
});

// const filterArrivalsSchema = Joi.object({
//   flight: Joi.string().min(3).required(),
// });

const createArrivalsSchema = Joi.object({

  flight: flight.required(),
  time: time.required(),
  origin: origin.required(),
  remarks: remarks.required(),
});

const updateArrivalsSchema = Joi.object({
  remarks,
});

module.exports = { getArrivalsSchema, createArrivalsSchema, updateArrivalsSchema };