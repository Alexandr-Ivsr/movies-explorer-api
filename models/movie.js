const mongoose = require('mongoose');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

  director: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
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
    minlength: 4,
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
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
    minlength: 2,
  },

  nameEN: {
    type: String,
    required: true,
    minlength: 2,
  },
});

module.exports = mongoose.model('movie', movieSchema);
