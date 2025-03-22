const {Arrivals} = require('../db/models/arrivals.model')



class ArrivalsService {
  constructor() {}

  async getAllArrivals() {
    try {
      const rta = await Arrivals.findAll();
      return {
        statusCode: 200,
        message: "Vuelos obtenidos exitosamente",
        data: rta
      };
    } catch (error) {
      console.error(error.message)
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`
      }
    }
  }



  async createArrivals(data) {
    try {
      const newArrivals = await Arrivals.create(data);
      if (!newArrivals){
        return {
          statusCode: 404,
          message: `No se pudo crear el vuelo.`
        }
      }
      return {
        statusCode: 201,
        message:`El vuelo fue creado exitosamente.`
      };

    } catch (error) {
      console.error(error.message)
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`
      }
    }
  }



  async updateOneArrivals(flight, changes) {
    try {
      const arrivals = await Arrivals.findOne({
        where:{
          flight:flight
        }
      });
      if (!arrivals){
        return {
          statusCode: 404,
          message: `El vuelo ${flight} no existe en la base de datos.`
        }
      }
      const rta =await arrivals.update(changes);
      if (!rta){
        return {
          statusCode: 500,
          message: `El vuelo ${flight} no se pudo actualizar.`
        }
      }
      return {
        statusCode: 200,
        message:`El vuelo ${flight} fue actualizado exitosamente.`
      };

    } catch (error) {
      console.error(error.message)
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`
      }
    }
  }



  async deleteArrivals(flight) {
   try {
    const arrivalSelected = await Arrivals.findOne({
      where:{
        flight:flight
      }
    });
    if (arrivalSelected === null){
      return {
        statusCode: 404,
        message: `El vuelo ${flight} no existe en la base de datos.`
      }
    }

    await arrivalSelected.destroy();
    return {
      statusCode: 200,
      message:`El vuelo ${flight} fue eliminado exitosamente.`
    };

   } catch (error) {
    console.error(error.message)
    return {
      statusCode: 500,
      message: `Ha ocurrido un error desconocido.`
    }
   }
  }

}


module.exports = {ArrivalsService};