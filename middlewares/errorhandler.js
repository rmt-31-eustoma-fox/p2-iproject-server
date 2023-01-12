const errorHandler = async (err, req, res, next) => {
    console.log(err, '<<<error hanndler>>>');
    if (err.name == "SequelizeValidationError" || err.name === 'SequelizeUniqueConstraintError') {
        const message = err.errors[0].message
        res.status(400).json({
            statusCode: 400,
            message
        })
    } else if (err.name == "invalid login") {
        res.status(401).json({
            statusCode: 401,
            message: "Invalid email or passwords"
        })
    } else if (err.name == "is not exist") {
        res.status(404).json({
            statusCode: 404,
            message: "is not exist"
        })
    } else if (err.name == "Invalid token" || "invalid token") {
        res.status(401).json({
            statusCode: 401,
            message: "Invalid token"
        })
    } else if (err.name == "forbidden") {
        res.status(403).json({
            statusCode: 403,
            message: 'forbidden'
        })
    } else res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error"
    })
}

module.exports = errorHandler