const axios = require('axios');
const { signToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const { User } = require('../models');

class Controller {
  static async agents(req, res, next) {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://valorant-api.com/v1/agents',
      });

      const mappedData = data.data
        .filter((el) => el.isPlayableCharacter == true)
        .map((el) => {
          return {
            uuid: el.uuid,
            displayName: el.displayName,
            description: el.description,
            imageUrl: el.fullPortrait,
            role: el.role,
            abilities: el.abilities,
          };
        });

      res.status(200).json(mappedData);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.create({ email, password });

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      //   res.status(500).json({ message: 'ISE', error });
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: 'Empty_email' };
      if (!password) throw { name: 'Empty_password' };

      const user = await User.findOne({ where: { email } });

      if (!user) throw { name: 'invalid' };

      const valid = comparePassword(password, user.password);

      if (!valid) throw { name: 'invalid' };

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      //   res.status(500).json({ message: 'ISE', error });
      next(error);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const token = req.headers['google-auth-token'];

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];

      const { email } = payload;

      let [user, created] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          password: 'ini_password',
          role: 'customer',
        },
      });

      let message, code;
      if (created) {
        message = `User has been created`;
        code = 201;
        user = created;
      } else {
        message = `User with ${user.email} has been found`;
        code = 200;
      }

      // res.status(code).json({ message, access_token: encodeToken({ id: user.id }), email: user.email });
      res.status(code).json({ access_token: signToken({ id: user.id }) });
      // console.log({ user, created });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
