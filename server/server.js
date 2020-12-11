const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'))
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room name are required')
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))

    callback();
  })

  socket.on('createMessage', (message, callback) => {
    // console.log('createMessage', message)
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    
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
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  })

  socket.on('disconnect', () => {
    // console.log('Disconnected from Server')
    var user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  })
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})


// io.emit - emit message to everyone connected
// socket.broadcast.emit - sends message to everyone connected to the server except the current user
// socket.emit - emits event specific to one user

// For Rooms
// io.to('Room Name').emit
// socket.broadcast.to('Room Name').emit

// socket.leave('Room Name');

// other features
// drop down for rooms
// usernames shouldn't be duplicated
// rooms should not be case sensitive
// user can leave room -- hint below
// <a href="javascript:window.open('','_self').close();">close</a>
// specifying a different window
// function close_window() {
//   if (confirm("Close Window?")) {
//     close();
//   }
// }
// HTML <a href="javascript:close_window();">close</a>
// OR <a href="#" onclick="close_window();return false;">close</a>
