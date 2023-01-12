const {Genre, Movie, User} = require("../models").models;
const {checkPass} = require("../helpers/bcryptjs");
const verifyGToken = require("../helpers/googleVerify");
const { genToken } = require("../helpers/jsontoken");
const emailSender = require("../helpers/nodemailer");
const makeSubscription = require("../helpers/payment");
// next(error)

class Controller {
    static loginForm = async(req,res) => {
        const {email, password} = req.body;
        try {
            if(!email || !password) throw {name: "Invalid Email or Password"}
            // console.log(email, password);
            const user = await User.findOne({email});
            if(!user) throw {name: "Email not found"};
            const passCheck = checkPass(user.password, password);
            if(!passCheck) throw {name: "Invalid Email or Password"};
            const access_token = genToken({id:user._id});
            // console.log(access_token);
            // localStorage.setItem("access_token",access_token);
            res.status(200).json({message:"Successfull login", access_token});
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static registerForm = async(req,res,next) => {
        const {email, password, firstName, lastName} = req.body;
        try {
            // console.log(req.body);
            const newUser = await User.create({email, password, firstName, lastName});
            const resp = {
                email:newUser.email,
                firstName:newUser.firstName,
                lastName:newUser.lastName,
                role:newUser.role,
            }
            // console.log(newUser);
            res.status(201).json({message:"Succesfull created", data:resp});
        } catch (error) {
            next(error)
        }
    }

    static getMoviesAndGenre = async(req,res,next) => {
        try {
            const movgen = await Movie.find({},{__v:0}).populate({path:"genres", select:{__v:0}});
            // console.dir(movgen, {depth:5});
            res.status(200).json({movgen});
        } catch (error) {
            next(error)
        }
    }

    static getUserData = async(req,res,next) => {
        const userId = req.user;
        try {
            const userData = await User.findById(userId, {password:0, __v:0}).populate({
                path:"watchList",
                select:{__v:0},
                populate: {
                    path:"genres",
                    select:{name:1}
                }
            });
            if(!userData) throw {name:"User not found"};
            res.status(200).json({user:userData});
        } catch (error) {
            next(error);
        }
    }

    static getOneMovie = async(req,res,next) => {
        const {movieId} = req.params;
        try {
            const movie = await Movie.findById(movieId).populate({
                path:"genres",
                select:{name:1}
            })
            if(!movie) throw {name:"Movie not found"};
            res.status(200).json({movie});
        } catch (error) {
            next(error);
        }
    }

    static userSubscribe = async(req,res,next) => {
        const userId = req.user;
        const {amount, recurPlan} = req.body;

        try {
            const userData = await User.findById(userId);
            const subsId = await makeSubscription(userId,userData,+amount,recurPlan);
            res.status(200).json({subsId});
        } catch (error) {
            next(error);
        }
    }

    static addWatchList = async(req,res,next) => {
        const UserId = req.user;
        const movieId = req.params.movieId;
        try {
            await User.findByIdAndUpdate(UserId, {$push: {watchList:movieId}})
            res.status(201).json({message:"success added movie to watchlist", movieId});
        } catch (error) {
            next(error);
        }
    }

    static updateSubs = async(req,res,next) => {
        const UserId = req.user;
        try {
            await User.updateOne({_id:UserId}, {role:"Subscribed"});
            res.status(200).json({message:"Success update Subscription"});
        } catch (error) {
            next(error);
        }
    }

    static sendEmailUser = async(req,res,next) => {
        const {subject,description,clientEmail} = req.body;
        try {
            await emailSender(clientEmail, subject,description);
            res.status(200).json({message:"Email sent successfull"})
        } catch (error) {
            next(error);
        }
    }

    static googleLogin = async(req,res,next) => {
        const {access_token} = req.headers;
        try {
            const data = await verifyGToken(access_token);
            // console.log(data);
            const {email,given_name,picture} = data;
            let statusCode, message;
            // console.log(data);
            let user = await User.findOne({email})
            if(!user) {
                user = await User.create({firstName:given_name,email,password:given_name, lastName:given_name,avatar:picture})
                statusCode = 201;
                message = `User with ${email} has been created`;
            } else {
                statusCode = 200;
                message = `User with ${email} has been found`;
            }

            res.status(statusCode).json({message, access_token:genToken({id:user.id})})
        } catch (error) {
            next(error);
            // next(error)
        }
    }

    static facebookLogin = async(req,res,next) => {
        const {email,picture,name} = req.body;
        try {
            // console.log(email,picture,name);
            // console.log(data);
            let statusCode, message;
            // console.log(data);
            let user = await User.findOne({email})
            if(!user) {
                user = await User.create({firstName:name,email,password:name, lastName:name,avatar:picture.data.url})
                statusCode = 201;
                message = `User with ${email} has been created`;
            } else {
                statusCode = 200;
                message = `User with ${email} has been found`;
            }

            res.status(statusCode).json({message, access_token:genToken({id:user.id})})
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;