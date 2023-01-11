const {User, Profile, Deck, DeckCard} =require('../models')
const {comparePassword} = require('../helpers/bcryptjs')
const {encodeToken} = require('../helpers/jwt')
const { default: axios } = require('axios')

class Controller {
    static async register (req, res, next) {
        try {
            const {email, password, username} = req.body
            let user = {}
            const users = await User.create({email, password, username})
            user.id = users.id
            user.email = users.email
            user.username = users.username
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
            const {id, name, type, atk, def, level, race, attributes, banlist, sort, frameType, desc, fname} = req.query
            const card = await axios({
                method: "get",
                url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
                params: {id, name, type, atk, def, level, race, attributes, banlist, sort, frameType, desc, fname}
            })
            res.status(200).json(card.data.data)
        } catch (error) {next(error)}}
    
    static async createDeck(req, res, next){
        try {
            const {name} = req.body
            const {id} = req.user
            await Deck.create({ProfileId: id, name})
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
            if (check.length > 2) throw {name: "is invalid", message: "Cannot add more than 3"}
            const checkAll = await DeckCard.findAll()
            if (checkAll.length > 80) throw {name: "is invalid", message: "Cannot have more than 60 card"}
            await DeckCard.create({DeckId: deckid, CardId: data[0].id, name: data[0].name, type: data[0].type, desc: data[0].desc, image_url: data[0].image_url, image_url_small: data[0].image_url_small, image_url_cropped: data[0].image_url_cropped})
            res.status(201).json({message: "Success Adding Card"})
        } catch (error) {next(error)}}

    static async getMyDeckCards(req, res, next){
        try {
            const {deckid} = req.params
            const deck = await DeckCard.findAll({where: {DeckId: deckid}})
            res.status(200).json(deck)
        } catch (error) {next(error)}
    }
}

module.exports = {Controller}