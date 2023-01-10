const { User } = require("../models");

const { encodeToken, comparePassword } = require("../helpers");

// const CLIENT_ID = process.env["CLIENT_ID"];
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(CLIENT_ID);

class Controller {
  static async create(req, res, next) {
    try {
      console.log("masuk");
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        role: "admin",
      });

      const showUser = {
        id: newUser.id,
        email: newUser.email,
      };
      res.status(201).json({
        message: `Success create new user with id: ${showUser.id} and email ${showUser.email}`,
        showUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      const error = { name: "Invalid Login" };
      if (!user) {
        throw error;
      } else {
        const checkPassword = comparePassword(password, user.password);
        if (!checkPassword) {
          throw error;
        } else {
          const access_token = encodeToken({
            id: user.id,
          });
          res
            .status(200)
            .json({ access_token, username: user.username, role: user.role });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // static async googleLogin(req, res, next) {
  //   try {
  //     const access_token = req.headers.access_token;

  //     const ticket = await client.verifyIdToken({
  //       idToken: access_token,
  //       audience: CLIENT_ID,
  //     });
  //     const { email, name } = ticket.getPayload();

  //     const [user, created] = await User.findOrCreate({
  //       where: { email },
  //       defaults: {
  //         username: name,
  //         email,
  //         password: "password",
  //         role: "staff",
  //       },
  //     });

  //     if (user) {
  //       const access_token = encodeToken({
  //         id: user.id,
  //       });
  //       res
  //         .status(200)
  //         .json({ access_token, username: user.username, role: user.role });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = Controller;