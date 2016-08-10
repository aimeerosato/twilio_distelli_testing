//Express
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var twilio = require('twilio');
var mongoose = require('mongoose');

//database setup 
//var Message = require('./server/messageSchema.js');

//console.log("This is this message ", Message);

//mongoose.connect("mongodb://localhost/twilio");

//Connect to Twilio
var dotenv = require('dotenv').config({silent: true});
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

//Set up Pug view template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(express.static('views')); //don't need b/c now using pug
app.use(bodyParser.urlencoded({
	extended: true
})); //twilio API needs
app.use(bodyParser.json()); //needed for local testing

app.get('/', function(req, res) {
	res.render('layout.pug'); //puts the layout template into there
});

//twilio.webhook(), took it out - maybe we don't need it because it's configured on twilio dashboard?
router.post('/send',
	function(req, res) {
	 console.log("inside router /post");
	 console.log("req.body is ", req.body);
	 console.log("this is the whole req", req);

	client.sms.messages.post({
		to: '+' + req.body.number,
		from: process.env.TWILIO_NUMBER,
		body: req.body.message
	}, function(err, text) {
		if(err){
			console.error(err);
			res.status(500).send(err)
		}else{
			console.log("This is the text ", text);
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

app.use('/', router);

module.exports = app;
