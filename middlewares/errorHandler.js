const errorHandler = (error, req, res, next) => {
    let code = 500
    let message = 'Internal Server Error'

    if (error.name == "SequelizeUniqueConstraintError" || error.name == 'SequelizeValidationError') {
        code = 400
        message = error.errors[0].message
    } else if (error.name == 'Invalid') {
        code = 401
        message = 'Invalid email/password'
    } else if (error.name == 'InvalidCityId') {
        code = 404
        message = 'City not found'
    }

    res.status(code).json({message})
}

module.exports = errorHandler