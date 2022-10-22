const { response } = require("express")

const errorHandler = (err, req, res, next) => {

  const statusCodeValue=  res.statusCode ? res.statusCode : 500;
  
  res.status(statusCodeValue)

  .json({
     
    mes:err.mes,
    stack: process.env.NODE_ENV == 'production' ? null : err.stack,

  });

}

module.exports = { errorHandler}