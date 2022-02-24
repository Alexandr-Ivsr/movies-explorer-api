const mongoose = require('mongoose');
const validator = require('validator');

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
      if (!validator.isUrl(value, { require_protocol: true })) {
        throw new Error({ message: 'Ошибка!' });
      }
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isUrl(value, { require_protocol: true })) {
        throw new Error({ message: 'Ошибка!' });
      }
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isUrl(value, { require_protocol: true })) {
        throw new Error({ message: 'Ошибка!' });
      }
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isAlpha(value, ['ru-RU'])) {
        throw new Error({ message: 'Ошибка!' });
      }
    },
  },

  nameEN: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isAlpha(value, ['en-US'])) {
        throw new Error({ message: 'Ошибка!' });
      }
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
