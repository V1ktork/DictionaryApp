const jwt = require('jsonwebtoken');
const JWT_KEY = 'YION1tf7w}%AKBTM{EH}dVdVdWyClgMK7JrhL6cJjhqfk$7E';

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Вы не авторизованы для доступа к этой странице.'
    });
  }
};
