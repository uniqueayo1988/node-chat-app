var socket = io();

socket.on('connect', function() {
  console.log('Connected to Server')

  // socket.emit('createMessage', {
  //   to: 'jen@example.com',
  //   text: 'Hey, this is Andrew.'
  // })

})

socket.on('disconnect', function() {
  console.log('Disconnected from Server')
})

socket.on('newMessage', function(message) {
  console.log('New Message', message)
  var li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()

  var messageTextBox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    // clear chat input after sending message
    messageTextBox.val("");
  })
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    console.log(position)
  }, function () {
    locationButton.removeAttr('disabled').text('Send location')
    alert('Unable to fetch location')
  })
})