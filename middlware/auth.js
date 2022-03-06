const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;

  if (!token) {
    next(new UnauthorizedError('Ошибка! Необходима авторизация.'));
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    console.log(err.name);
    next(new UnauthorizedError('Ошибка! Необходима авторизация.'));
  }
  req.user = payload;

  next();
};

module.exports = auth;
