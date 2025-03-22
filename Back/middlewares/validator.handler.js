
//esta es una funcion que retorna otra funcion
//estamos creando un middleware de forma dinamica
//Este es el portero que valida que vengan todos los datos q el cliente debe mandar

function validatorHandler(schema,property) {
  return(req,res,next) => {
    const data= req[property];
//abortEarly para que envie todos los errores a la vez
    const {error} = schema.validate(data,{abortEarly:false});
    if(error){
return res.status(400).json({statusCode:400 ,message:error.details[0].message})
    }
    next();
  }
}

module.exports = {validatorHandler};
