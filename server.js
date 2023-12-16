const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/keys')

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
})
mongoose.connection.on('connected', () => {
  console.log('connected to mongo')
})
mongoose.connection.on('error', () => {
  console.log('err connecting', err)
})

app.use(require('./routes/user'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(require('./routes/auth'))
app.use(require('./routes/book'))

// app.use(express.static(path.join(__dirname, '/client/build')))

app.set('view engine', 'hbs')

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
//   res.json('hello world')
// })

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port (${PORT})`)
})
