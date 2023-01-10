const errorHandler = (error, req, res, next) => {
  console.log(error)
  let code = 500;
  let message = "Internal Server Error";
  if (error.name === "SequelizeValidationError") {
    code = 400;
    message = error.errors[0].message;
  } else if (error.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = error.errors[0].message
  } else if (error.name === "Invalid Token" ||error.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid Token";
  } else if (error.name === "Invalid Login") {
    code = 401;
    message = "Incorrect email or password";
  } else if (error.name === "404 not found") {
    code = 404;
    message = "Error, Not found";
  } else if (error.name === "forbidden") {
    code = 403;
    message = "Forbidden";
  } else if (error.name === "please login with customer account!"){
    code = 401
    message = "please login with customer account!"
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;