const { User, Cart, OrderHistory, Category, Product } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const { Op } = require("sequelize");
const axios = require("axios");
const midtransClient = require("midtrans-client");
const BMI_KEY = process.env.BMI_KEY;
const nodemailer = require("nodemailer");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const newUser = await User.create({ email, password });

      res.status(201).json({ message: `user with email ${newUser.email} has been created` });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: "invalidLogin" };

      const validPassword = comparePassword(password, user.password);
      if (!validPassword) throw { name: "invalidLogin" };

      const payload = {
        id: user.id,
      };
      const access_token = generateToken(payload);

      res.status(200).json({ access_token, username: user.username });
    } catch (error) {
      next(error);
    }
  }

  static async googleSignin(req, res, next) {
    try {
      const googleToken = req.headers["google-oauth-token"];
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENT_ID,
      });

      const { email, name } = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name,
          email,
          password: "google",
        },
        hooks: false,
      });

      const payload = {
        id: user.id,
      };

      const access_token = generateToken(payload);

      res.status(200).json({ access_token, username: user.username });
    } catch (error) {
      next(error);
    }
  }

  static async products(req, res, next) {
    try {
      let { filter } = req.query;
      let paramQuerySQL = {};

      // filtering by category
      if (filter !== "" && typeof filter !== "undefined") {
        const query = filter.category.split(",").map((item) => ({
          [Op.eq]: item,
        }));
        paramQuerySQL.where = {
          CategoryId: { [Op.or]: query },
        };
      }

      const products = await Product.findAll(paramQuerySQL);

      if (products) res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async detailProduct(req, res, next) {
    try {
      const { id } = req.params;
      const selectedProduct = await Product.findByPk(id, {
        include: [User, Category],
      });
      if (selectedProduct) {
        res.status(200).json(selectedProduct);
      } else {
        throw { name: "Product with that id is not found" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async categories(req, res, next) {
    try {
      const categories = await Category.findAll({
        order: [["name", "Desc"]],
      });
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async cart(req, res, next) {
    try {
      const products = await Cart.findAll({
        order: [["ProductId", "ASC"]],
        include: [User, Product],
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async addCart(req, res, next) {
    try {
      const { id } = req.params;
      const selectedProduct = await Product.findByPk(id);

      if (!selectedProduct) throw { name: "Product with that id is not found" };

      await Cart.create({
        UserId: req.user.id,
        ProductId: id,
      });

      res.status(200).json({ message: `Product successfully add to Shopping Cart` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const { id } = req.params;
      const selectedCart = await Cart.findByPk(id);
      if (!selectedCart) throw { name: "Product with that id is not found" };

      await Cart.destroy({
        where: {
          id,
          UserId: req.user.id,
        },
      });

      res.status(200).json({ message: `Product successfully remove from Shopping Cart` });
    } catch (error) {
      next(error);
    }
  }

  static async orderHistory(req, res, next) {
    try {
      const orders = await OrderHistory.findAll({
        order: [["id", "DESC"]],
        include: [User, Product],
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async pay(req, res, next) {
    try {
      const products = await Cart.findAll({
        order: [["id", "ASC"]],
        include: [User],
        where: {
          UserId: req.user.id,
        },
      });

      if (products.length == 0) throw { name: "Your Cart is Empty" };

      for (let i = 0; i < products.length; i++) {
        await OrderHistory.create({
          UserId: req.user.id,
          ProductId: products[i].ProductId,
        });
      }
      await Cart.destroy({
        where: {},
        truncate: true,
      });

      res.status(200).json({ message: `Payment Success` });
    } catch (error) {
      next(error);
    }
  }

  static async bmi(req, res, next) {
    try {
      const { age, weight, height } = req.body;
      if (age <= 0 || age > 80) throw { name: "Age cannot be smaller than 1 or bigger than 80" };
      if (weight < 40 || weight > 160) throw { name: "Weight cannot be smaller than 40 or bigger than 160" };
      if (height < 130 || height > 230) throw { name: "Height cannot be smaller than 130 or bigger than 230" };

      const { data } = await axios({
        url: `https://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`,
        method: "get",
        headers: {
          "X-RapidAPI-Key": BMI_KEY,
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async midtrans(req, res, next) {
    try {
      const { amount } = req.body;
      const { id } = req.user;

      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.YOUR_SERVER_KEY,
        clientKey: process.env.YOUR_CLIENT_KEY,
      });

      const user = await User.findByPk(id, {
        include: [Cart],
      });

      console.log(user, "<<1");
      const parameter = {
        transaction_details: {
          order_id: "order-id-" + Math.round(new Date().getTime() / 1000) + "-" + Math.round(Math.random() * 100),
          gross_amount: amount,
        },

        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      const transactionToken = transaction.token;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mraldrino@gmail.com",
          pass: process.env.NODEMAILER_PASS,
        },
      });

      const mailOptions = {
        from: "mraldrino@gmail.com",
        to: user.email,
        // to: "aldr@yopmail.com",
        subject: "Transaction Notification at de'Millie",
        html: "<h2>You have made a purchase at de'Millie. Thank you!</h2>",
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).json({ message: "error sending mail" });
        } else {
          console.log("berhasil", info);
        }
      });

      res.status(200).json({ transactionToken });
    } catch (error) {
      next(error);
    }
  }

  static async qrCode(req, res, next) {
    try {
      const { url } = req.body;
      if (!url) throw { name: "Invalid url" };

      const { data } = await axios({
        url: `https://api.happi.dev/v1/qrcode?data=${url}&width=&dots=000000&bg=FFFFFF`,
        method: "get",
        headers: {
          "x-happi-key": process.env.HAPPY_QR_KEY,
          "Accept-Encoding": "application/json",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
