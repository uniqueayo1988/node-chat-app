var socket = io();

socket.on('connect', function() {
  console.log('Connected to Server')

  socket.emit('createEmail', {
    to: 'jen@example.com',
    text: 'Hey, this is Andrew.'
  })
})

socket.on('disconnect', function() {
  console.log('Disconnected from Server')
})

socket.on('newEmail', function(email) {
  console.log('New Email', email)
})
