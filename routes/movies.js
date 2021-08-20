const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovie, createMovie, deleteMovie,
} = require('../controllers/cards');

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/),
  }),
}), createCard);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required().hex(),
  }),
}), deleteCard);

module.exports = router;
