const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'YION1tf7w}%AKBTM{EH}dVdVdWyClgMK7JrhL6cJjhqfk$7E';

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    if (user) {
      throw new Error('Пользователь с таким логином уже зарегистрирован.');
    }

    if (!req.body.login.trim() || !req.body.password.trim()) {
      throw new Error('Необходимо заполнить все поля!');
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    if (hash) {
      const newUser = new User({
        login: req.body.login,
        password: hash
      });

      const data = await newUser.save();

      res.status(201).json({
        success: true,
        message: 'Регистрация прошла успешно!',
        data
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: err.message
    });
  }
};

exports.login = (req, res, next) => {
  User.findOne({ login: req.body.login })
    .exec()
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              success: false,
              message: 'Не удалось авторизоваться.',
              err
            });
          }

          if (result) {
            const token = jwt.sign(
              {
                id: user._id,
                login: user.login
              },
              JWT_KEY,
              { expiresIn: '6h' }
            );

            return res
              .status(200)
              .set({
                'Access-Control-Expose-Headers': 'Access-Token',
                'Access-Token': 'Bearer ' + token
              })
              .json({
                message: 'Вы успешно авторизованы!'
              });
          }

          res.status(401).json({
            success: false,
            message: 'Не удалось авторизоваться.'
          });
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Не удалось авторизоваться.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err,
        message: err.message
      });
    });
};
