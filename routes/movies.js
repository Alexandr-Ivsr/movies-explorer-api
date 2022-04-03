const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovieList, createMovie, deleteMovie } = require('../controllers/movies');
const { validateUrl } = require('../utils/validation');

router.get('/', getMovieList);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(100),
    director: Joi.string().required().min(5).max(100),
    duration: Joi.number().required(),
    year: Joi.number().required().min(4),
    description: Joi.string().required().min(4),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().min(2).required(),
    nameEN: Joi.string().min(2).required(),
  }),
}), createMovie);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
