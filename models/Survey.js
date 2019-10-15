const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipientSchema = require('./Recipient');
const EmailInputSchema = require('./EmailInput');

const SurveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	custom: {
		type: Boolean,
		default: false
	},
	emailInputs: [EmailInputSchema],
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', SurveySchema);
