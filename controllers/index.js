const { Op } = require('sequelize')
const { compareHash } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User, City, Accomodation, Image, Transaction } = require('../models')

class Controller {
    static async register (req, res, next) {
        const {name, email, password, dateOfBirth, phoneNumber, address} = req.body
        try {
            const newUser = await User.create({name, email, password, dateOfBirth, phoneNumber, address})
            res.status(201).json({ message : `Success register, Welcome ${newUser.name}`, name: newUser.name })
        } catch (error) {
            next(error)
        }
    }

    static async login (req, res, next) {
        const {email, password} = req.body
        try {
            const user = await User.findOne({
                where: {email}
            })
            if (!user) {
                throw {name: 'Invalid'}
            } else {
                const isValid = compareHash(password, user.password)
                if (!isValid) {
                    throw {name: 'Invalid'}
                } else {
                    const access_token = signToken({id: user.id})
                    res.status(200).json({access_token, username: user.name})
                }
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async showCities (req, res, next) {
        try {
            const cities = await City.findAll()
            res.status(200).json(cities)
        } catch (error) {
            next(error)
        }
    }

    static async showAccomodationByCity (req, res, next) {
        const {CityId} = req.params
        try {
            const city = await City.findByPk(CityId)
            if (!city) {
                throw {name: 'InvalidCityId'}
            } else {
                const accomodations = await Accomodation.findAll({
                    where: {CityId},
                    include: [
                        {model: City, attributes: ['name']},
                        {model: Image, attributes: ['imageUrl']}
                    ]
                })
                res.status(200).json(accomodations)
            }
        } catch (error) {
            next(error)
        }
    }

    static async findAccomodation (req, res, next) {
        const {accomodationId} = req.params
        try {
            const accomodation = await Accomodation.findByPk(accomodationId, {include: [
                {model: Image, attributes: ['imageUrl']}
            ]})
            if (!accomodation) {
                throw {name: 'InvalidAccomodationId'}
            } else {
                res.status(200).json(accomodation)
            }
        } catch (error) {
            next(error)
        }
    }

    static async showTransactions (req, res, next) {
        try {
            const transactions = await Transaction.findAll({
                where: {UserId: req.user.id},
                include: [
                    {model: Accomodation}
                ]
            })
            res.status(200).json(transactions)
        } catch (error) {
            next(error)
        }
    }

    static async addTransaction (req, res, next) {
        const {accomodationId} = req.params
        try {
            const targetAccomodation = await Accomodation.findByPk(accomodationId)
            if (!targetAccomodation) {
                throw {name: 'InvalidAccomodationId'}
            } else {
                await Transaction.create({UserId: req.user.id, AccomodationId: targetAccomodation.id, price: targetAccomodation.price, date: req.body.date})
                res.status(201).json({message: `${targetAccomodation.name} has been added to your transaction list`})
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteTransaction (req, res, next) {
        const {id} = req.params
        try {
            const targetAccomodation = await Accomodation.findByPk(id)
            if (!targetAccomodation) {
                throw {name: 'InvalidAccomodationId'}
            } else {
                const deletedTransaction = await Transaction.findOne({
                    where: {
                        [Op.and]: [
                            {UserId: req.user.id},
                            {AccomodationId: id}
                        ]
                    }
                })
                if (!deletedTransaction) {
                    throw {name: 'InvalidTransaction'}
                } else {
                    await Transaction.destroy({
                        where: {
                            id: deletedTransaction.id
                        }
                    })
                    res.status(200).json({message: `${targetAccomodation.name} has been removed from your transaction list`})
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async completePayment (req, res, next) {
        const {id} = req.params
        const isPaid = true
        try {
            const targetAccomodation = await Accomodation.findByPk(id)
            if (!targetAccomodation) {
                throw {name: 'InvalidAccomodationId'}
            } else {
                const updatedTransaction = await Transaction.findOne({
                    where: {
                        [Op.and]: [
                            {UserId: req.user.id},
                            {AccomodationId: id}
                        ]
                    }
                })
                if (!updatedTransaction) {
                    throw {name: 'InvalidTransaction'}
                } else {
                    await Transaction.update({isPaid}, {
                        where: {
                            id: updatedTransaction.id
                        }
                    })
                    res.status(200).json({message: `Success to pay ${targetAccomodation.name}`})
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller