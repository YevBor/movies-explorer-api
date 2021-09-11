const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const getMovies = (req, res, next) => Movie.find({})
  .sort({ createdAt: -1 })
  .then((movies) => res.status(200).send(movies))
  .catch(next);

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  // const owner = "611f6e0b938bb7233fdc1a4e";
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({movie}))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError('Данные не прошли валидацию');
      } else next(err);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie
    .findOne({ _id: req.params.movieId })
    .orFail(() => new NotFoundError('Карточка с таким id не найдена'))
    .then((movie) => {
      if (!movie.owner.equals(owner)) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      } else {
        Movie.deleteOne(movie)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Данные не прошли валидацию');
      }
      throw err;
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
