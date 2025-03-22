const express = require('express');
const passport = require('passport')
const {UserService} = require('../services/user.service');
const {validatorHandler} = require('../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');
const router = express.Router();


const Uservice = new UserService();



router.get('/chk-tkn',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    res.status(200).json({data: true});
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await Uservice.getUsers();
    res.status(users.statusCode).json(users);
  } catch (error) {
    next(error);
  }

});


router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const dataUser = req.body;
      const newUser = await Uservice.createUser(dataUser);
      res.status(newUser.statusCode).json(newUser);
    } catch (error) {
      console.error(error)
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const result = await Uservice.updateUser(id, body);
      res.status(result.statusCode).json(result);

    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const respuesta = await Uservice.deleteUser(id);
      res.status(respuesta.statusCode).json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
