const router = require('express').Router();
const UsersRouter = require('./users');
const MoviesRouter = require('./movies');
const SignupRouter = require('./signup');
const SigninRouter = require('./signin');
const SignoutRouter = require('./signout');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlware/auth');

router.use('/signup', SignupRouter);
router.use('/signin', SigninRouter);
router.use('/signout', SignoutRouter);
router.use(auth);
router.use('/users', UsersRouter);
router.use('/movies', MoviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Ошибка! запрашиваемая страница не найдена'));
});

module.exports = router;
