const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT || 4000
require('./mongoose')
const messageRouter = require('./routes/message')
const bookRouter = require('./routes/book')

app.use(express.static(path.join(__dirname, '/client/build')))

app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})

app.use('/message', messageRouter)
app.use('/book', bookRouter)

app.listen(port, () => {
  console.log(`Server running on port (${port})`)
})
