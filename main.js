//Express
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var twilio = require('twilio');

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
//twilio.webhook(), took it out - maybe we don't need it because it's configured on twilio dashboard?
// router.post('/send', function(req, res) {
// 	console.log("inside router /post");
// 	console.log("req is ", req.body);

// 	client.sms.messages.post({
//     to: '+' + req.body.number,
//     from: process.env.TWILIO_NUMBER,
//     body: req.body.message
// }, function(err, text) {
//     console.log('You sent: '+ text.body);
//     console.log('Current status of this text message is: '+ text.status);
// });
// 	//res.send("You sent a text"); 
//   var  twim1 = new twilio.TwimlResponse();
//   twim1.message("This is your response");
//   res.send(twim1.toString());
// });

router.post('/send', function(req, res) {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
    console.log("This is req.body.Body ", req.body.Body);
    if (req.body.Body == 'hello') {
        twiml.message('Hi!');
    } else if(req.body.Body == 'bye') {
        twiml.message('Goodbye');
    } else {
        twiml.message('No Body param match, Twilio sends this in the request to your server.');
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

// var options = {
//        host:'http://twilio-testing-monday-dev.us-east-1.elasticbeanstalk.com/',
//     };

// router.get('/send', twilio.webhook(options), 
//   function (request, response) {
//     var twiml = new twilio.TwimlResponse();
//     twiml.message('This HTTP request came from the patio');
//     response.send(twiml.toString());
// });

// router.post('/send', twilio.webhook(), function(request, response) {
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
