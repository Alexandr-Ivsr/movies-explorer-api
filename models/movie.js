const mongoose = require('mongoose');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
  },

  director: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 30,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
    minlength: 4,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Ошибка! В поле {PATH} передана некорректная ссылка.');
      }
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Ошибка! В поле {PATH} передана некорректная ссылка.');
      }
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Ошибка! В поле {PATH} передана некорректная ссылка.');
      }
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },

  movieId: {
    type: String,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isAlpha(value, ['ru-RU'])) {
        throw new BadRequestError('Ошибка! Значение поля {PATH} должно быть на русском языке.');
      }
    },
  },

  nameEN: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isAlpha(value, ['en-US'])) {
        throw new BadRequestError('Ошибка! Значение поля {PATH} должно быть на английском языке.');
      }
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
