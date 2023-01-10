

class Controller {
    static async Register (req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.create({username, email, password, role: "User", phoneNumber, address})
            res.status(201).json({statusCode: 201, user})
        } catch (error) {next(error)}
    }
}

module.exports = {Controller}