'use strict';

// Reference: https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());

  // var https = require('https');
  // var server = https.createServer(app).listen(config.port, () => console.log('webhook is listening') {
  //     console.log('Https App started');
  // });

//   var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello World!');
//   res.end();
// }).listen(8080, "http://afx-data-vis-sp18.herokuapp.com");

app.listen(process.env.PORT || 1337, () => console.log('HELLO WORLD'));

  // hostname = "afx-data-vis-sp18.herokuapp.com",
  // server = app.listen(process.env.PORT, function () {
  //   var host = server.address().address;
  //   var port = server.address().port;
  //   console.log('running at http://' + host + ':' + port)
  // });

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  let body = req.body;


  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});


// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "AFX_DATA_VIS_SP_2018"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // For static site only
    // res.sendFile(path.join(__dirname + 'views/index.html'));

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});
