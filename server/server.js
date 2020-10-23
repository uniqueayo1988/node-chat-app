const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newEmail', {
    from: 'mike@example .com',
    text: 'Hey, what is going on,',
    createdAt: 123
  })

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from Server')
  })
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
