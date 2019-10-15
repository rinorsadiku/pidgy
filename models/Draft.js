const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmailInputSchema = require('./EmailInput');

const DraftSchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [String],
	custom: {
		type: Boolean,
		default: false
	},
	emailInputs: [EmailInputSchema],
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	sender: String,
	facebook: String,
	instagram: String,
	twitter: String,
	template: String
});

mongoose.model('drafts', DraftSchema);
