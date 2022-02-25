const User = require('../models/user');

const getCurrentUser = (req, res, next) => {
  const CurrentUserId = 'fsdhshdfh23434234';

  User.findById(CurrentUserId)
    .orFail(new Error(`Пользователь с указанным id:${CurrentUserId} не существует`))
    .then((user) => {
      res.status(200).send(user);
      console.log(user);
    })
    .catch((err) => {
      console.log(err.name, err.status, err.code);
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const CurrentUserId = 'fsdhshdfh23434234';
  const { email, name } = req.body;

  User.findByIdAndUpdate(CurrentUserId, { email, name }, { new: true, runValidators: true })
    .orFail(new Error(`Пользователь с указанным id:${req.user._id} не существует`))
    .then((user) => {
      res.status(200).send(user);
      console.log('user profile update!');
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        next(new Error('Переданы некорректные значения при обновлении пользователя'));
      } else if (err.name === 'ValidationError') {
        next(new Error(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      next(err);
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
};
