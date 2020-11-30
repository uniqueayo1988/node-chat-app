// const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accountSid = "ACd54ef47c002cad3b32a1c1292d6f082b";
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const authToken = "391e86013a0cdf8c41dbc01df7b8f749";
const client = require('twilio')(accountSid, authToken);

client.messages.list({limit: 1})
  // .then(messages => messages.forEach(m => console.log(m)));
  .then(
    messages => {
      console.log(messages);
    }
  );
