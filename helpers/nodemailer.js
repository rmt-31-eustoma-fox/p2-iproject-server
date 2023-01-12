const nodemailer = require('nodemailer')

const send = (email) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })

    let mailOption = {
        from: 'hackTravel@gmail.com',
        to: `${email}`,
        subject: 'Welcome to HackTravel',
        html: '<h1>Thanks for register, please login</h1>'
    }

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    })
}

module.exports = send