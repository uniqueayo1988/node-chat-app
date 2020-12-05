// const accountSid = "ACd54ef47c002cad3b32a1c1292d6f082b";
// const authToken = "9aede14b4a1232b956f5112e0a73c271";
const client = require('twilio')(accountSid, authToken);

client.messages.list({limit: 1})
  // .then(messages => messages.forEach(m => console.log(m)));
  .then(
    messages => {
      console.log(messages);
    }
  );
