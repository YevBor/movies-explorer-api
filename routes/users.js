const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateProfile, getMe,
} = require('../controllers/users');

router.get('/me', getMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);
module.exports = router;
