const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const UsersRouter = require('./routes/users');
const MoviesRouter = require('./routes/movies');
const { signup, signin, logout } = require('./controllers/users');
const errorHandler = require('./middlware/error-handler');
const auth = require('./middlware/auth');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.post('/signup', signup);
app.post('/signin', signin);
app.get('/signout', logout);

app.use(auth);
app.use('/users', UsersRouter);
app.use('/movies', MoviesRouter);
app.use((req, res, next) => {
  next(new NotFoundError('Ошибка! запрашиваемая страница не найдена'));
});

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/moviesdb', {
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
