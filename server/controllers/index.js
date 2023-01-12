const axios = require('axios')
const { xml2json } = require('xml-js')
const { Team, Driver, Standings, Circuit } = require('../models')
const midtransClient = require('midtrans-client')
const nodemailer = require('nodemailer')

class Controller {
    static async driverList(req, res, next){
        try {
            const data = await Driver.findAll({
                include: {
                    model: Team,
                    attributes: ['name']
                }
            })

            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async constructorList(req, res, next){
        try {
            const data = await Team.findAll()

            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async teamList(req, res, next){
        try {
            const data = await Team.findAll({
                include: {
                    model: Driver,
                    attributes: ['name', 'number', 'image', 'nationality', 'countryName', 'world_championships', 'podiums']
                }
            })

            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async circuitList(req, res, next){
        try {
            const data = await Circuit.findAll()

            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async findEvent(req, res, next){
        try {
            const {id} = req.params
            const data = await Circuit.findOne({
                where: {id}
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async findDriver(req, res, next){
        try {
            const {id} = req.params
            const data = await Driver.findOne({
                where: {
                    id: id,
                    
                },
                include: {
                    model: Team,
                    attributes: ['name']
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async midtransToken(req, res, next){
        const { first_name, last_name, email, phone } = req.body
        try {
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : 'SB-Mid-server-51rl_dDqeUZ9AzbPac9f01ez'
            });

            let parameter = {
                transaction_details: {
                    order_id: "ORDER_" + Math.floor(1000 + Math.random() * 230595),
                    gross_amount: 10000
                },
                credit_card:{
                    secure : true
                },
                customer_details: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone
                }
            };

            const token = await snap.createTransaction(parameter)
            res.status(201).json(token)
        } catch (error) {
            console.log(error)
        }
    }

    static async invoiceSender(req, res, next){
        try {
            const { first_name, last_name, email, phone } = req.body
            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: 'f1tickets@outlook.com',
                    pass: '1234567890qwerty'
                }
            })
            console.log(email)
            const options = {
                from: 'f1tickets@outlook.com',
                to: email,
                subject: 'F1 TICKETS PAYMENT INVOICE TICKET',
                text: 'YOUR PAYMENT HAS COMPLETE'
            }

            transporter.sendMail(options, function(err, info) {
                if(err){
                    console.log(err)
                    return
                }
                console.log('email sent')
                })
        } catch (error) {
            console.log(error)
        }
        
    }

}

module.exports = Controller