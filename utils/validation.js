const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const validateUrl = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequestError('Ошибка! Передана некорректная ссылка');
  }
  return value;
};

// const validateRussianAlpha = (value) => {
//   if (!validator.isAlphanumeric(value, ['ru-RU'], { ignore: ' ' })) {
//     throw new BadRequestError('Ошибка! Значение поля {PATH} должно быть на русском языке.');
//   }
//   return value;
// };

// const validateEnglishAlpha = (value) => {
//   if (!validator.isAlphanumeric(value, ['en-US'], { ignore: ' ' })) {
//     throw new BadRequestError('Ошибка! Значение поля {PATH} должно быть на английском языке.');
//   }
//   return value;
// };

module.exports = {
  validateUrl,
};
