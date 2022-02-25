const router = require('express').Router();
const { getMovieList, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovieList);
router.post('/', createMovie);
router.delete('/:_id', deleteMovie);

module.exports = router;
