const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateEmail } = require('../utils/validation');
const { signup } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
}), signup);

module.exports = router;
