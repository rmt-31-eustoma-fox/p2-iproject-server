const nodemailer = require('nodemailer')

const send = (email) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_ACCOUNT,
            pass: process.env.NODEMAILER_PASS
        }
    })

    let mailOption = {
        from: 'apotekbrotonegoro@gmail.com',
        to: `${email}`,
        subject: 'thanks for register',
        html: '<h1>Thanks for register, please login</h1>'
    }

    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}

module.exports = send