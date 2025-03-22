const Joi = require('joi');

const name = Joi.string();
const lastName = Joi.string();
const age = Joi.number()
const id = Joi.number().integer();

const email = Joi.string().email();
const password = Joi.string().min(8);


const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  age: age.required(),
  email: email.required(),
  password: password.required(),

});

const updateUserSchema = Joi.object({
  email: email,

});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }