const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = "YION1tf7w}%AKBTM{EH}dVdVdWyClgMK7JrhL6cJjhqfk$7E";

const User = require("../models/user");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Необходимо заполнить все поля!",
        error: err
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        login: req.body.login,
        password: hash
      })
        .save()
        .then(data => {
          res.status(201).json({
            success: true,
            message: "Регистрация прошла успешно!",
            data
          });
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            error: err
          });
        });
    }
  });
};

exports.login = (req, res, next) => {
  User.findOne({ login: req.body.login })
    .exec()
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Не удалось авторизоваться.",
              err
            });
          }

          if (result) {
            const token = jwt.sign(
              {
                userId: user._id,
                login: user.login
              },
              JWT_KEY,
              { expiresIn: "6h" }
            );

            return res
              .status(200)
              .header("x-auth", token)
              .json({
                message: "Вы успешно авторизованы!"
              });
          }

          res.status(401).json({
            message: "Не удалось авторизоваться."
          });
        });
      } else {
        res.status(401).json({
          message: "Не удалось авторизоваться."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
};
