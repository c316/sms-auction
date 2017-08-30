const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const toNumber = process.env.TO_NUMBER;
const fromNumber = process.env.FROM_NUMBER;
const twilio = require('twilio');

const client = twilio(accountSid, authToken);

client.messages.create({
  to:   toNumber,
  from: fromNumber,
  body: 'Yo, what up'
})
.then((message) => console.log(message.sid));
