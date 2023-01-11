const { User, MyBook } = require("../models")
const { verifyToken } = require("../helpers")

const auth = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if(!access_token) throw {name: "InvalidToken"}
        
        const payload = verifyToken(access_token)
        
        const user = await User.findByPk(payload.id)
        if(!user) throw {name: "InvalidToken"}

        req.user = {
            id: user.id,
            name: user.username,
            email: user.email
        }

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

        if(mybook.status == "Want to read"){
            req.book = {status: "Currently reading"}
        } else if(mybook.status == "Currently reading"){
            req.book = {status: "Has been read"}
        }
        
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
    } else if (error.name === "RequiredDataLog") {
        code = 400
        message = "Email or password is required"
    } else if (error.name === "InvalidLog") {
        code = 401
        message = "Invalid email or password"
    } else if(error.name === "InvalidToken" || error.name === 'JsonWebTokenError'){
        code = 401
        message = "Invalid token"
    } else if (error.name === "Forbidden") {
        code = 403
        message = "You are unauthorized"
    } else if (error.name === "DataNotFound") {
        code = 404
        message = "Book not found"
    } else if (error.name === "DuplicateMyBook") {
        code = 400
        message = "You already have this e-book"
    } else if (error.name === "RequiredDataQuery") {
        code = 400
        message = "Keyword is required"
    }

    res.status(code).json({message: message})
}

module.exports = { auth, authorize, errHandler }