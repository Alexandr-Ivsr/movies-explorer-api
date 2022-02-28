const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovieList, createMovie, deleteMovie } = require('../controllers/movies');
const { validateUrl } = require('../utils/validation');

router.get('/', getMovieList);
router.post('/', createMovie);
router.delete('/:_id', deleteMovie);

module.exports = router;
