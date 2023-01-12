const errorHandling = (err,req,res,next) => {
    let code,message;

    switch(err.name) {
        case "JsonWebTokenError":
        case "Invalid Token":
            code = 401
            message = "Invalid Token"
            break;
        case "Incorect Input":
            code = 401
            message = err.message;
            break;
        case "Forbidden":
            code = 403;
            message = err.name;
            break;
        case "ValidationError":
            code = 400
            // let errors = {};

            // Object.keys(err.errors).forEach((key) => {
            //     errors[key] = err.errors[key].message;
            // });
            let key = Object.keys(err.errors)[0]
            message = err.errors[key].message;
            break;
        case "User Not Found":
        case "Movie Not Found":
            code = 404
            message = err.name;
            break;
        default:
            code = 500
            message = "Internal Server Error"
    }

    res.status(code).json({message})
}

module.exports = errorHandling;