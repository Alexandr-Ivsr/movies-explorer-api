const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UsersRouter = require('./routes/users');
const MoviesRouter = require('./routes/movies');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/users', UsersRouter);
app.use('/movies', MoviesRouter);

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
