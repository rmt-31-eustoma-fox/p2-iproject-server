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
  } else if (err.name === "Your Cart is Empty") {
    code = 400;
    message = "Your Cart is Empty";
  } else if (err.name === "Age cannot be smaller than 1 or bigger than 80") {
    code = 400;
    message = "Age cannot be smaller than 1 or bigger than 80";
  } else if (err.name === "Weight cannot be smaller than 40 or bigger than 160") {
    code = 400;
    message = "Weight cannot be smaller than 40 or bigger than 160";
  } else if (err.name === "Height cannot be smaller than 130 or bigger than 230") {
    code = 400;
    message = "Height cannot be smaller than 130 or bigger than 230";
  } else if (err.name === "Invalid url") {
    code = 400;
    message = "Invalid url";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
