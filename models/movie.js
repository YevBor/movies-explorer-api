const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Ссылка не в корректном формате',
      require_protocol: true,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Ссылка не в корректном формате',
      require_protocol: true,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Ссылка не в корректном формате',
      require_protocol: true,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
