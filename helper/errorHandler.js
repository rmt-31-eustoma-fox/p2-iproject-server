const errorHandler = (err, req, res, next) => {
    console.log(err)
    let code = 500
    let message = 'Internal Server Error'

    if(err.response.status === 400){
        code = 400
        message = 'Bad Request'
    }

    res.status(code).json({message})
}

module.exports = { errorHandler }