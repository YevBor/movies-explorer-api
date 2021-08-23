const express = require('express');

const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

const NotFoundError = require('../errors/not-found-err');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const indexRouter = express.Router();

indexRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

indexRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

// авторизация
indexRouter.use(auth);

indexRouter.use('/users', usersRouter);
indexRouter.use('/', moviesRouter);

indexRouter.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = indexRouter;
