var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	number: String,
	message: String,
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;