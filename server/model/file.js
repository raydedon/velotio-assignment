const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
	name: String,
	type: String
});

// create the model for user and expose it to our app
module.exports = mongoose.model('File', fileSchema);