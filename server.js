const http = require('http');
const express = require('express');
const session = require('express-session');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const sessionSecret = process.env.SESSION_SECRET;

const app = express();

app.use(session({secret: sessionSecret}));

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end('Hello');
});
app.post('/sms', (req, res) => {
  let smsCount = req.session.counter || 0;

  let message = 'Hello, thanks for the new message.';

  if(smsCount > 0) {
    message = 'Hello, thanks for message number ' + (smsCount + 1);
  }

  req.session.counter = smsCount + 1;

  const twiml = new MessagingResponse();
  twiml.message(message);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});