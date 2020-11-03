const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback()
    // Broadcast to all other from you
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
    socket.broadcast.emit('adminMsg', {
      msg: 'Welcome to chat app'
    })
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from Server')
  })
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
