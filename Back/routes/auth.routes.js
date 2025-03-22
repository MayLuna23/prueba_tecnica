const express = require('express');

const router = express.Router();
const {AuthService} = require('../services/auth.service')


const Auservice = new AuthService();

router.post('/',
  async (req, res, next) => {
  try {

    const email = req.body.email;
    const password = req.body.password;
    const validation = await Auservice.login(email, password);
    res.status(validation.statusCode).json(validation);
  } catch (error) {
    console.error(error.message)
    next(error);
  }
});


module.exports = router;