const {verToken} = require("../helpers/jsontoken");
const {User} = require("../models").models;

const authen = async(req,res,next) => {
    const {access_token} = req.headers;
    try {
        if(!access_token) throw {name:"Invalid token"};
        // console.log(access_token);
        const token = verToken(access_token);
        // console.log(token);
        const userData = await User.findById(token.id)
        // console.log(token.id);
        if(!userData) throw {name:"User not found"}
        // console.log(userData);
        req.user = token.id;
        next()
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = authen;