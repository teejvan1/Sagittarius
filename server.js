const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const app = express()
const server = http.createServer(app)
// 'https://sagittarius-353a4636ce62.herokuapp.com
const io = socketIO(server)
// {cors: {
//   origin: 'http://localhost:3000',
// }}
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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes/user'))
app.use(require('./routes/auth'))
app.use(require('./routes/book'))
app.use(require('./routes/Conversations'))
app.use(require('./routes/Messages'))

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

let users = []

const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId })
}

const removeUser = socketId => {
  users = users.filter(user => user.socketId !== socketId)
}

const getUser = userId => {
  return users.find(user => user.userId === userId)
}

io.on('connection', socket => {
  //when ceonnect
  console.log('a user connected.')

  //take userId and socketId from user
  socket.on('addUser', userId => {
    addUser(userId, socket.id)
  })

  //send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId)
    io.to(user?.socketId).emit('getMessage', {
      senderId,
      text,
    })
  })

  //when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!')
    removeUser(socket.id)
    io.emit('getUsers', users)
  })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`Server running on port (${PORT})`)
})
