const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResponseSchema = require('./Response');

const DataModel = new Schema({
	email: {
		type: String,
		required: true
	},
	_survey: {
		type: Schema.Types.ObjectId,
		ref: 'Survey'
	},
	responses: [ResponseSchema]
});

mongoose.model('data', DataModel);
