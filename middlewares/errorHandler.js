const errorHandler = (err, req, res, next) => {
    let code = 500
    let message = 'Internal Server Error'
    console.log(err, "<<<<<<<<< ini eror");
    if (err.name === 'SequelizeValidationError' || err.name == "SequelizeUniqueConstraintError") {
        code = 400
        message = err.errors[0].message
    } else if (err.name == "Bad Request") {
        code = 400
        message = err.message
    } else if (err.name == "Invalid Login" || err.name == "JsonWebTokenError" || err.name == "Invalid Token") {
        code = 401
        message = err.message
    } else if (err.name == "404 not found") {
        code = 404
        message = "Data not found"
      } else if (err.name == "Forbidden") {
        code = 403
        message = "You are not authorized"
      }

    res.status(code).json({ message })
}

module.exports = errorHandler