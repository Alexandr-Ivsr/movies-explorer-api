require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, errors, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlware/logger');
const UsersRouter = require('./routes/users');
const MoviesRouter = require('./routes/movies');
const { signup, signin, logout } = require('./controllers/users');
const errorHandler = require('./middlware/error-handler');
const auth = require('./middlware/auth');
const NotFoundError = require('./errors/NotFoundError');
const corsHandler = require('./middlware/corsHandler');

const { PORT = 3000, DB_ADRESS = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

app.use(corsHandler);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
}), signup);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), signin);
app.get('/signout', logout);

app.use(auth);
app.use('/users', UsersRouter);
app.use('/movies', MoviesRouter);
app.use((req, res, next) => {
  next(new NotFoundError('Ошибка! запрашиваемая страница не найдена'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('mongoDB connection sucessfull');
})
  .catch(() => {
    console.log('mongoDB connection error');
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
