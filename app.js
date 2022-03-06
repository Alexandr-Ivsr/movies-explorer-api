require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlware/logger');
const errorHandler = require('./middlware/error-handler');
const corsHandler = require('./middlware/corsHandler');
const routes = require('./routes');

const { PORT = 3000, DB_ADRESS = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

app.use(corsHandler);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.use(routes);
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
