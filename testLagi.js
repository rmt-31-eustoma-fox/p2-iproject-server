const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'valFave@outlook.com',
    pass: '1234567890?>',
  },
});

const options = {
  from: 'valFave@outlook.com',
  to: 'nandonp02@gmail.com',
  subject: 'Signing notification',
  text: 'Thank you for signing in into our website <3',
};

transporter.sendMail(options, function (err, info) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Email is sent !');
});
