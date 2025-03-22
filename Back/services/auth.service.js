require("dotenv").config()
const { User } = require('../db/models/users.model');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET;

class AuthService {
  constructor() {}

  async login(email, password) {
    try {
        
        const rta = await User.findOne({
          where: {
            email: email,
          },
        });
        if (!rta) {
          return {
            statusCode: 400,
            message: 'La contraseña o el correo son incorrectos',
            data: null,
          };
        }
        const comparePassword = await bcrypt.compare(password, rta.password);
        if (!comparePassword) {
          return {
            statusCode: 400,
            message: 'La contraseña o el correo son incorrectos',
            data: null,

          };
        }

      return {
        statusCode: 200,
        message: 'Autenticacion exitosa',
        data: this.signToken(rta),
        
      };
    } catch (error) {
      console.error(error.message);
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`,
      };
    }
  }

  signToken(user){
    const payload = {
      id: user.dataValues.id,
      name: user.dataValues.name
    }
    const token = jwt.sign(payload, jwtSecret);
    return token
  }

}

module.exports = { AuthService };
