const Movie = require('../models/movie');

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
  const CurrentUserId = 'fsdhshdfh23434234';
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: CurrentUserId,
    movieId,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        next(new Error(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const CurrentUserId = 'fsdhshdfh23434234';

  Movie.findById(_id)
    .orFail(new Error(`Фильм с указанным id:${_id} не найден`))
    .then((movie) => {
      if (movie.owner.toString() === CurrentUserId) {
        return movie.remove();
      }

      return Promise.reject(new Error('Ошибка! Попытка удалить чужой фильм'));
    })
    .then(() => {
      res.status(200).send({ message: 'Фильм успешно удален.' });
      console.log('success delete!');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Error('Введен неккоретный id при попытке удаления фильма'));
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
