const axios = require('axios');
const { signToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const { User, Favorite } = require('../models');

const { OAuth2Client } = require('google-auth-library');
const { CLIENT_ID } = process.env;
const client = new OAuth2Client(CLIENT_ID);

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

      // console.log('masuk agent========');

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

  static async addToFav(req, res, next) {
    try {
      const { agentUuid } = req.params;

      // a
      const find = await Favorite.findOne({ where: { UserId: req.user.id, uuid: agentUuid } });
      // e

      if (find) {
        res.status(400).json({ message: 'Can not add agent twice' });
        return;
      }

      const { data } = await axios({
        method: 'get',
        url: `https://valorant-api.com/v1/agents/${agentUuid}`,
      });

      // console.log(data.data.displayName);

      await Favorite.create({
        UserId: req.user.id,
        uuid: data.data.uuid,
        displayName: data.data.displayName,
        description: data.data.description,
        imageUrl: data.data.fullPortrait,
        role: data.data.role.displayName,
        roleDesc: data.data.role.description,
        ability1Name: data.data.abilities[0].displayName,
        ability1Desc: data.data.abilities[0].description,
        ability2Name: data.data.abilities[1].displayName,
        ability2Desc: data.data.abilities[1].description,
        ability3Name: data.data.abilities[2].displayName,
        ability3Desc: data.data.abilities[2].description,
        ultName: data.data.abilities[3].displayName,
        ultDesc: data.data.abilities[3].description,
      });

      res.status(201).json({ message: 'Agent added to favorite!' });
    } catch (error) {
      //   console.log(error);
      //   res.status(500).json({ msg: 'ise', error });
      next(error);
    }
  }

  static async favorites(req, res, next) {
    try {
      const data = await Favorite.findAll({ where: { UserId: req.user.id } });

      res.status(200).json(data);
    } catch (error) {
      //   res.status(500).json({ message: 'ISE', error });
      next(error);
    }
  }

  static async removeFav(req, res, next) {
    try {
      const { id } = req.params;
      await Favorite.destroy({ where: { id } });

      res.status(200).json({ message: 'Removed from favorite' });
    } catch (error) {
      next(error);
    }
  }

  static async agentDetail(req, res, next) {
    try {
      const { uuid } = req.params;

      const { data } = await axios({
        method: 'get',
        url: `https://valorant-api.com/v1/agents/${uuid}`,
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      //   res.status(500).json({ msg: 'ise', error });
      next(error);
    }
  }
}

module.exports = Controller;
