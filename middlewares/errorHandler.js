const errorHandler = (error, req, res, next) => {
  let code = 500;
  let message = 'Internal server error';

  if (error.name == 'SequelizeUniqueConstraintError' || error.name == 'SequelizeValidationError') {
    code = 400;
    message = error.errors[0].message;
  } else if (error.name == 'Empty_email') {
    code = 400;
    message = 'Email is required';
  } else if (error.name == 'Empty_password') {
    code = 400;
    message = 'Password is required';
  } else if (error.name == 'invalid') {
    code = 401;
    message = 'Invalid email/password';
  } else if (error.name == 'IT' || error.name == 'JsonWebTokenError') {
    code = 401;
    message = 'Invalid token';
  } else if (error.name == 'NF') {
    code = 404;
    message = 'Not found';
  } else if (error.name == 'FB') {
    code = 403;
    message = 'Forbidden';
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
