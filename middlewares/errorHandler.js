const errorHandler = (error, req, res, next) => {
    let code = 500
    let message = 'Internal Server Error'

    if (error.name == "SequelizeUniqueConstraintError" || error.name == 'SequelizeValidationError') {
        code = 400
        message = error.errors[0].message
    } else if (error.name == 'Invalid') {
        code = 401
        message = 'Invalid email/password'
    } else if (error.name == 'invalid_token' || error.name == 'jsonWebTokenError') {
        code = 401
        message = 'Invalid Token'
    } else if (error.name == 'InvalidCityId') {
        code = 404
        message = 'City not found'
    } else if (error.name == 'InvalidAccomodationId') {
        code = 404
        message = 'Accomodation not found'
    } else if (error.name == 'InvalidTransaction') {
        code = 404
        message = 'Transaction not found'
    } else if (error.name == 'already_paid') {
        code = 400
        message = 'This transaction is already paid'
    }

    res.status(code).json({message})
}

module.exports = errorHandler