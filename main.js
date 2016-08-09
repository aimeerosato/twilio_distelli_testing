//Express
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var twilio = require('twilio');

//Connect to Twilio
var dotenv = require('dotenv').config({silent: true});
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send("hello");
})
//twilio.webhook(), took it out - maybe we don't need it because it's configured on twilio dashboard?
router.post('/send',
	function(req, res) {
	 console.log("inside router /post");
	 console.log("req is ", req.body);

	client.sms.messages.post({
		to: '+' + req.body.number,
		from: process.env.TWILIO_NUMBER,
		body: req.body.message
	}, function(err, text) {
		if(err){
			console.error(err);
			res.status(500).send(err)
		}else{
			console.log('You sent: '+ text.body);
			console.log('Current status of this text message is: '+ text.status);
			res.status(200).send('Text sent')
		}
	});
});

router.post('/receive',
	twilio.webhook(),//ensure message comes from twilio.
	function(req,res,next){
		console.log('entering receive route for Twilio');
		console.log('req.body: ', req.body);
    var twiml = new twilio.TwimlResponse();
    var incomingMessage = req.body.Body.toLowerCase().trim();
    console.log("This is the incoming message", incomingMessage);
    if(incomingMessage === "hello") {
    	twiml.message("Hi to you!");
    } else if (incomingMessage === "bye") {
    	twiml.message("Bye!");
    } else {
    	twiml.message("We did not understand your message.  Type either 'hello' or 'bye.'");
    }
    console.log("This is the twiml response ", twiml);
    //res.writeHead(200, {'Content-Type': 'text/xml'});
    res.status(200).send(twiml);
});

// router.post('/send', function(req, res) {
//     var twilio = require('twilio');
//     var twiml = new twilio.TwimlResponse();
//     console.log("This is req.body.Body ", req.body.Body);
//     if (req.body.Body.toLowerCase().trim() == 'hello') {
//         twiml.message('Hi!');
//     } else if(req.body.Body == 'bye') {
//         twiml.message('Goodbye');
//     } else {
//         twiml.message('No Body param match, Twilio sends this in the request to your server.');
//     }
//     res.writeHead(200, {'Content-Type': 'text/xml'});
//     res.end(twiml.toString());
// });

// var options = {
//        host:'http://twilio-testing-monday-dev.us-east-1.elasticbeanstalk.com/',
//     };

app.use('/', router);

module.exports = app;
