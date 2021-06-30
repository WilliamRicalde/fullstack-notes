require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('../app/build'))

app.use('/api', require('./controllers/login'))
app.use('/api', require('./controllers/notes'))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server on port ${PORT}`))
