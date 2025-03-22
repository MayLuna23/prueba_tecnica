const { User } = require('../db/models/users.model');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {}

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hasheo = await bcrypt.hash(password, salt);
    return hasheo;
  }


  async getUsers() {
    try {
      const rta = await User.findAll();
      const users = [];
      rta.forEach((e) => users.push(e.toJSON()));
      return {
        statusCode: 200,
        message: 'Usuarios obtenidos exitosamente',
        data: users,
      };
    } catch (error) {
      console.error(error.message);
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`,
      };
    }
  }

  async getAdults() {
    try {
      console.log('bebe');
      const users = await User.findAll({
        where: {
          age: {
            [Op.gte]: 18,
          },
        },
      });
      console.log(users);
      return {
        statusCode: 200,
        message: 'Usuarios obtenidos exitosamente',
        data: users,
      };
    } catch (error) {
      console.error(error.message);
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`,
      };
    }
  }

  async createUser(data) {
    try {
      data.password = await this.hashPassword(data.password);
      const newUser = await User.create(data);
      if (!newUser) {
        return {
          statusCode: 404,
          message: `No se pudo crear el usuario.`,
        };
      }
      return {
        statusCode: 201,
        message: `El usuario fue creado exitosamente.`,
      };
    } catch (error) {
      console.error(error.message);
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`,
      };
    }
  }

  async updateUser(id, changes) {
    try {
      const user = await User.findOne({
        where: {
          id: id,
        },
      });
      if (!user) {
        return {
          statusCode: 404,
          message: `El user con id ${id} no existe en la base de datos.`,
        };
      }
      const rta = await user.update(changes);
      if (!rta) {
        return {
          statusCode: 500,
          message: `El id ${id} no se pudo actualizar.`,
        };
      }
      return {
        statusCode: 200,
        message: `El usuario con id: ${id} fue actualizado exitosamente.`,
      };
    } catch (error) {
      console.error(error.message);
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`,
      };
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findOne({
        where: {
          id: id,
        },
      });
      if (user === null) {
        return {
          statusCode: 404,
          message: `El id ${id} no existe en la base de datos.`,
        };
      }

      await user.destroy();
      return {
        statusCode: 200,
        message: `El usuario con id: ${id} fue eliminado exitosamente.`,
      };
    } catch (error) {
      console.error(error.message);
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`,
      };
    }
  }
}

module.exports = { UserService };
