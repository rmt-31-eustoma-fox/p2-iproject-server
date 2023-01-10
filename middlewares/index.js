const { User, MyBook } = require("../models")
const { verifyToken } = require("../helpers")

const auth = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if(!access_token) throw {name: "InvalidToken"}
        
        const payload = verifyToken(access_token)
        
        const user = await User.findByPk(payload.id)
        if(!user) throw {name: "InvalidToken"}

        req.user = {id: user.id}

        next()
    } catch (error) {
        next(error)
    }
}

const authorize = async (req, res, next) => {
    try {
        const mybook = await MyBook.findByPk(req.params.id)
        if(!mybook) throw {name: "DataNotFound"}
        if(mybook.UserId != req.user.id) throw {name: "Forbidden"}

        next()
    } catch (err) {
        next(err)
    }
}

const errHandler = (error, req, res, next) => {
    let code = 500
    let message = "Internal server error"

    if (error.name === "SequelizeValidationError") {
        code = 400
        message = error.errors[0].message
    }

    res.status(code).json({message: message})
}

module.exports = { auth, authorize, errHandler }