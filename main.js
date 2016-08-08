//Express
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

//Connect to Twilio
var dotenv = require('dotenv').config();
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
	res.send("hello");
})

router.post('/send', function(req, res) {
	console.log("inside router /post");
	console.log("req is ", req.body);

	client.sms.messages.post({
    to: '+' + req.body.number,
    from: process.env.TWILIO_NUMBER,
    body: req.body.message
}, function(err, text) {
    console.log('You sent: '+ text.body);
    console.log('Current status of this text message is: '+ text.status);
});
	res.send("You sent a text");

});

// app.post('/sms', twilio.webhook(), function(request, response) {
//     var twiml = new twilio.TwimlResponse();
//     twiml.message('This HTTP request came from Twilio!');
//     response.send(twiml);
// });

// client.sms.messages.post({
//     to:'+16515559999',
//     from:'+14503334455',
//     body:'word to your mother.'
// }, function(err, text) {
//     console.log('You sent: '+ text.body);
//     console.log('Current status of this text message is: '+ text.status);
// });

app.use('/', router);

module.exports = app;
