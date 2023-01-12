const {User, Profile, Deck, DeckCard} =require('../models')
const {comparePassword} = require('../helpers/bcryptjs')
const {encodeToken} = require('../helpers/jwt')
const { default: axios } = require('axios')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);
const nodemailer = require('nodemailer')
const relatedYugiohs = ['https://duelingnexus.com/', 'https://ygoprodeck.com/', 'https://twitter.com/yugioh?lang=en', 'https://www.duellinksmeta.com/', 'https://ycm.netlify.app/calc', 'https://play.google.com/store/apps/details?', 'id=com.zurdo.duelist', 'http://yugiohtracker.com/#/newCards', 'https://www.aygocm.co.uk/']


class Controller {
    static mailer (sendto){
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: "dicapricornus17@gmail.com",
              pass: "ylmdmaszkjrtfdoa"
            },
          });
          
          let mailOptions = {
            from: 'dicapricornus@gmail.com',
            to: sendto,
            subject: `Register successfully`,
            html: `You're successfully register in our site`,
          };
          
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err, "<<<<<<<")
            } else {
              console.log(info, "Berhasil kirim email <<<<<<<")
            }
          });
    }

    static async google (req, res, next) {
        try {
            const {access_token_google} = req.headers
            let access_token
            const ticket = await client.verifyIdToken({
            idToken: access_token_google,
            audience: CLIENT_ID
            });
            const {name, email} = ticket.getPayload();
            const [user, create] = await User.findOrCreate({
                where: {email}, defaults: {
                    username: name, password: String(Math.random()), email
                }
            })
            if (user){
                Controller.mailer(user.email)
                access_token = encodeToken({id: user.id})
                console.log(user.id, "<<<<<USERID")
                await Profile.create({UserId: user.id})
                res.status(200).json({statusCode: 200, access_token})
            } else {
                access_token = encodeToken({id: create.id})
                res.status(201).json({statusCode: 201, access_token})
            }
        } catch (error) {next(error)}}

    static async register (req, res, next) {
        try {
            const {email, password, username} = req.body
            let user = {}
            const users = await User.create({email, password, username})
            user.id = users.id
            user.email = users.email
            user.username = users.username
            Controller.mailer(users.email)
            await Profile.create({UserId: user.id})
            res.status(201).json({id: user.id, email: user.email, username: user.username})
        } catch (error) {next(error)}}

    static async login (req, res, next) {
        try {
            const {username, password} = req.body
            if (!username) throw {name: "is empty", message: "Username is required"}
            if (!password) throw {name: "is empty", message: "Password is required"}
            const users = await User.findOne({where: {username}})
            if (users){
                if (comparePassword(password, users.password)){
                    const access_token = encodeToken({id: users.id})
                    res.status(201).json({message: "Log In Succes", access_token})
                } else throw {name: "Invalid email or password", message: "Invalid email or password"} 
            } else throw {name: "Invalid email or password", message: "Invalid email or password"}
        } catch (error) {next(error)}}

    static async getCard (req, res, next){
        try {
            const {name, type, atk, def, level, race, attribute, banlist, sort, frameType, desc, fname} = req.query
            let yugiParams
            if (name) yugiParams = {name}
            if (type) yugiParams = {type}
            if (atk) yugiParams = {atk}
            if (def) yugiParams = {def}
            if (level) yugiParams = {level}
            if (race) yugiParams = {race}
            if (attribute) yugiParams = {attribute}
            if (frameType) yugiParams = {frameType}
            if (banlist) yugiParams = {banlist}
            if (sort) yugiParams = {sort}
            if (desc) yugiParams = {desc}
            if (fname) yugiParams = {fname}
            const card = await axios({
                method: "get",
                url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
                params: yugiParams,
            })
            res.status(200).json(card.data.data)
        } catch (error) {next(error)}}
    
    static async createDeck(req, res, next){
        try {
            const {name} = req.body
            const {id} = req.user
            let profileId
            const user = await User.findByPk(id, {include: {model: Profile}})
            profileId = user.Profile.id
            await Deck.create({ProfileId: profileId, name})
            res.status(201).json({message: "Success create deck"})
        } catch (error) {next(error)}}

    static async editsCards(req, res, next){
        try {
            const {deckid} = req.params
            const {cardid} = req.body
            let data
            const find = await axios({
                method: "get",
                url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
                params: {
                    id: cardid
                }
            })
            data = find.data.data
            const check = await DeckCard.findAll({where: {DeckId: deckid, CardId: data[0].id}})
            if (check.length >= 3) throw {name: "is invalid", message: "Cannot have more than 3"}
            const checkAll = await DeckCard.findAll()
            if (checkAll.length >= 81) throw {name: "is invalid", message: "Cannot have more than 60 card"}
            await DeckCard.create({DeckId: deckid, CardId: data[0].id, name: data[0].name, type: data[0].type, desc: data[0].desc, image_url: data[0].card_images[0].image_url, image_url_small: data[0].card_images[0].image_url_small, image_url_cropped: data[0].card_images[0].image_url_cropped})
            res.status(201).json({message: "Success Adding Card"})
        } catch (error) {next(error)}}

    static async getMyDecks (req, res, next){
        try {
            const {id} = req.user
            let profileId
            const user = await User.findByPk(id, {include: {model: Profile}})
            profileId = user.Profile.id
            const myDecks = await Deck.findAll({where: {ProfileId: profileId}})
            res.status(200).json(myDecks)
        } catch (error) {next(error)}}

    static async deleteDeck (req, res, next){
        try {
            const {deckid} = req.params
            await Deck.destroy({where: {id: deckid}})
            res.status(200).json({message: 'Success delete deck'})
        } catch (error) {next(error)}}

    static async theDeck (req, res, next){
        try {
            const {deckid} = req.params
            const deck = await Deck.findByPk(deckid, {include: ['DeckCards']})
            res.status(200).json({deck})
        } catch (error) {next(error)}}

    static async selectCard (req, res, next){
        try {
            const {id} = req.query
            const card = await axios({
                method: "get",
                url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
                params: {id},
            })
            res.status(200).json({name: card.data.data[0].name, desc: card.data.data[0].desc, image_url: card.data.data[0].card_images[0].image_url})
        } catch (error) {console.log(error)}}

    static async deleteCard (req, res, next){
        try {
            const {CardId} = req.body
            await DeckCard.destroy({where: {id: CardId}})
            res.status(200).json({message: "Delete success"})
        } catch (error) {next(error)}}

    static async uploadImage (req, res, next){
        try {
            await Profile.update({where: {UserId: req.user.id}})
        } catch (error) {console.log(error)}}

    static async user (req, res, next){
        try {
            const user = await User.findByPk(req.user.id, {attribute: {exclude: ['password']}})
            res.status(200).json(user)
        } catch (error) {next(error)}}

    static getWeb (req, res, next){
        try {
            let qrX = []
            const qrApi = "c085a80LhNSV5nZD8BB7XrvfJnvaIMsIKZyw17bZdGbez7h44Vz9ELD2"
            for (let i = 0; i < relatedYugiohs.length; i++){
                console.log(relatedYugiohs[i])
                axios({
                    method: "get",
                    url: `https://api.happi.dev/v1/qrcode`,
                    headers: {
                        "x-happi-key": qrApi
                    },
                    params: {
                        data: relatedYugiohs[i]
                    }
                })
                .then(qr => {
                    qrX.push(qr.data)
                    if (i+1 == relatedYugiohs.length){
                        res.status(200).json({qrX})
                    }
                })
            }
        } catch (error) {next(error)}}
}

module.exports = {Controller}