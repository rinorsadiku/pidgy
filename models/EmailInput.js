const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmailInputSchema = new Schema({
	inputType: {
		type: String
	},
	inputValue: {
		type: String
	}
});

module.exports = EmailInputSchema;
