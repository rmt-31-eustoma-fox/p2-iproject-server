const { comparePassword } = require('../helpers/bcrypt');
const { jwtSign } = require('../helpers/jwt');
const { User } = require('../models');
const nodemailer = require('nodemailer');
class Index {
  static mailer(mailto) {
    var transporter = nodemailer.createTransport({
      service: 'hotmail',
      secure: false, // use SSL
      port: 25, // port for secure SMTP
      auth: {
        user: 'mitrasurya7@outlook.com',
        pass: 'Hebataja7@',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: 'mitrasurya7@outlook.com',
      to: mailto,
      subject: `Register successfully`,
      Text: `Thank for You join to our website`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err, '<<<<<<<');
      } else {
        console.log(info, 'Berhasil kirim email <<<<<<<');
      }
    });
  }

  static async register(req, res, next) {
    try {
      const { fullname, email, password, imageUrl } = req.body;
      const regUser = await User.create({ fullname, email, password, imageUrl, role: 'employer' });
      Index.mailer(regUser.email);
      res.status(201).json({
        statuscode: 201,
        id: regUser.id,
        name: regUser.fullname,
        email: regUser.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || email == '') {
        res.status(400).json({ message: 'email is require' });
      }
      if (!password || password == '') {
        res.status(400).json({ message: 'password is require' });
      }
      const logUser = await User.findOne({ where: { email } });
      if (!logUser) {
        throw { name: 'invalid_data' };
      }
      if (!comparePassword(password, logUser.password)) {
        throw { name: 'invalid_data' };
      }
      const token = jwtSign({ id: logUser.id, username: logUser.fullname, role: logUser.role });
      res.status(201).json({ statuscode: 201, access_token: token, image: logUser.imageUrl, fullname: logUser.fullname });
    } catch (error) {
      next(error);
    }
  }
  static async gempaterbaru(req, res, next) {
    {
      try {
        const dataGempa = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
        res.status(200).json({ data: dataGempa });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = Index;
