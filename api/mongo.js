const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('DB Connected'))
  .catch(err => console.log(err))

process.on('uncaughtException', err => {
  console.log(err)
  mongoose.disconnect()
})
