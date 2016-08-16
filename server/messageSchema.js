var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	number: String,
	message: String,
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;



/*
This is when they respond:  { ToCountry: 'US',
  ToState: 'VT',
  SmsMessageSid: 'SMcd17ca44b6fa67dabe5166380165b4f5',
  NumMedia: '0',
  ToCity: 'RUTLAND',
  FromZip: '05701',
  SmsSid: 'SMcd17ca44b6fa67dabe5166380165b4f5',
  FromState: 'VT',
  SmsStatus: 'received',
  FromCity: 'RUTLAND',
  Body: 'Hi',
  FromCountry: 'US',
  To: '+18027974189',
  ToZip: '05701',
  NumSegments: '1',
  MessageSid: 'SMcd17ca44b6fa67dabe5166380165b4f5',
  AccountSid: 'AC222616d6cbcd4892e471b0529c777a94',
  From: '+18025587314',
  ApiVersion: '2010-04-01' }

  This is the text sent from website  { sid: 'SM603c2074e2554727845b2e06c8e3a185',
  date_created: 'Wed, 10 Aug 2016 14:24:14 +0000',
  date_updated: 'Wed, 10 Aug 2016 14:24:14 +0000',
  date_sent: null,
  account_sid: 'AC222616d6cbcd4892e471b0529c777a94',
  to: '+18025587314',
  from: '+18027974189',
  body: 'Sent from your Twilio trial account - hi',
  status: 'queued',
  direction: 'outbound-api',
  api_version: '2010-04-01',
  price: null,
  price_unit: 'USD',
  uri: '/2010-04-01/Accounts/AC222616d6cbcd4892e471b0529c777a94/SMS/Messages/SM603c2074e2554727845b2e06c8e3a185.json',
  num_segments: '1',
  dateCreated: Wed Aug 10 2016 14:24:14 GMT+0000 (UTC),
  dateUpdated: Wed Aug 10 2016 14:24:14 GMT+0000 (UTC),
  dateSent: null,
  accountSid: 'AC222616d6cbcd4892e471b0529c777a94',
  apiVersion: '2010-04-01',
  priceUnit: 'USD',
  numSegments: '1' }
*/

