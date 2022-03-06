const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const validateUrl = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequestError('Ошибка! Передана некорректная ссылка');
  }
  return value;
};

const validateEmail = (value) => {
  if (!validator.isEmail(value, { require_protocol: true })) {
    throw new BadRequestError('Некорректное значение поля email');
  }
  return value;
};

module.exports = {
  validateUrl,
  validateEmail,
};
