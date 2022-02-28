const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenRequestError = require('../errors/ForbiddenRequestError');

const getMovieList = (req, res, next) => {
  Movie.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const CurrentUserId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: CurrentUserId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const CurrentUserId = req.user._id;

  Movie.findById(_id)
    .orFail(new NotFoundError(`Фильм с указанным id:${_id} не найден`))
    .then((movie) => {
      if (movie.owner.toString() === CurrentUserId) {
        return movie.remove();
      }

      return Promise.reject(new ForbiddenRequestError('Ошибка! Попытка удалить чужой фильм'));
    })
    .then(() => {
      res.status(200).send({ message: 'Фильм успешно удален.' });
      console.log('success delete!');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен неккоретный id при попытке удаления фильма'));
      }
      console.log(err.name, err.status, err.code);
      next(err);
    });
};

module.exports = {
  getMovieList,
  createMovie,
  deleteMovie,
};
