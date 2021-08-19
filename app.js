// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? BASE_URL : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});