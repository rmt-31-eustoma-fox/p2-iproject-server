const errorHandler = (err, req, res, next) => {
    console.log(err)
    if (err.name == "SequelizeValidationError"){
        const message = err.errors[0].message
        res.status(400).json({message})
    }
    else if (err.name == "is empty") res.status(400).json({message: err.message})
    else if (err.name == "is invalid") res.status(400).json({message: err.message})
    else if (err.name == "JsonWebTokenError") res.status(400).json({message: "Invalid Token"})
    else if (err.name == "SequelizeDatabaseError") res.status(400).json({message: 'Category is empty or image url is too long'})
    else if (err.name == "SequelizeUniqueConstraintError") res.status(400).json({message: err.message})
    else if (err.name == "Invalid email or password") res.status(401).json({message:  err.message})
    else if (err.name == "is not exist") res.status(404).json({message: err.message})
    else if (err.name == "Invalid token") res.status(401).json({message: err.message})
    else if (err.name == "previlege") res.status(403).json({message: err.message})
    else res.status(500).json({message: "Internal Server Error"})
}

module.exports = errorHandler