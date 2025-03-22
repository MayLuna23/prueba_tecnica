const { ValidationError } = require('sequelize');


//Middleeware para logear errores
function logErrors(err,req,res,next) {
  console.error(err.message);
  next(err);
}
//Middleware para ccrear un estandar de formato cada vez que tengamos un error
function errorHandler(err,req,res,next) {
  res.status(500).json({
    message:err.message,
    stack:err.stack,
  });
}

//Para el manejo de boom
function boomErrorHandler(err,req,res,next) {
  if (err.isBoom) {
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
  };

  function ormErrorHandler(err, req,res, next) {
    if (err instanceof ValidationError) {
      res.status(409).json({
        statusCode: 409,
        message: err.name,
        errors:err.errors
      });
    }
    next(err)
  }


module.exports ={ logErrors,errorHandler,boomErrorHandler,ormErrorHandler}


//Los middleware de tipo error:
//deben tener los 4 parametros
//se deben hacer despues de definir el routing
