const client = require('twilio')(accountSid, authToken);

client.messages.list({limit: 1})
  // .then(messages => messages.forEach(m => console.log(m)));
  .then(
    messages => {
      console.log(messages);
    }
  );
