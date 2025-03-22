const {Departures} = require('../db/models/departures.model')



class DeparturesService {
  constructor() {}

  async getAllDepartures() {
    try {
      const rta = await Departures.findAll();
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



  async createDepartures(data) {
    try {

      const newDepartures = await Departures.create(data);
      if (!newDepartures){
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



  async updateOneDepartures(flight, changes) {
    try {
      const departures = await Departures.findOne({
        where:{
          flight:flight
        }
      });
      if (!departures){
        return {
          statusCode: 404,
          message: `El vuelo ${flight} no existe en la base de datos.`
        }
      }
      const rta =await departures.update(changes);
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



  async deleteDepartures(flight) {
   try {
    const departureSelected = await Departures.findOne({
      where:{
        flight:flight
      }
    });
    if (departureSelected === null){
      return {
        statusCode: 404,
        message: `El vuelo ${flight} no existe en la base de datos.`
      }
    }

    await departureSelected.destroy();
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


module.exports = {DeparturesService};