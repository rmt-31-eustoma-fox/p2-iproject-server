const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  console.log(err, "iniapa");

  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "invalidLogin") {
    code = 401;
    message = "Wrong Email or Password";
  } else if (err.name === "invalid_token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid Token";
  } else if (err.name === "Product with that id is not found") {
    code = 404;
    message = "Product with that id is not found";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
