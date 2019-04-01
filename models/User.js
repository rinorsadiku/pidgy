const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	providerId: String,
	name: String,
	email: String,
	profilePicture: String,
	provider: String
});

mongoose.model('users', userSchema);
