require('dotenv').config();
const nodemailer = require('nodemailer');
const sendMail = (from , to, subject, text) =>{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth : {
      user : process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });
  
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMail