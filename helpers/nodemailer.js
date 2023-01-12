const nodemailer = require('nodemailer');

// create a transporter object to handle sending the email
// let transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//       user: 'ruendyant.mayraclle@gmail.com',
//       pass: 'voupirjrqgmphecd'
//   },
// });

// define the email options
// let mailOptions = {
//   from: 'ruendyant.mayraclle@gmail.com',
//   to: 'ruendyant0101@gmail.com',
//   subject: 'Test Email',
//   text: 'This is a test email sent using nodemailer.'
// };

// send the email
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//       console.log(error);
//   } else {
//       console.log('Email sent: ' + info.response);
//   }
// });

async function emailSender(sendTo,subject,description) {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'ruendyant.mayraclle@gmail.com',
                pass: 'voupirjrqgmphecd'
            },
          });
    
          let mailOptions = {
            from: sendTo,
            to: 'ruendyant.mayraclle@gmail.com',
            subject: subject,
            text: description
          };
          
          await transporter.sendMail(mailOptions)
    } catch (error) {
        throw error;
    }
}

module.exports = emailSender;