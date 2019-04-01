const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // This library gives us access to cookies
const passport = require('passport'); // We're going to use this to tell passport what to use to keep track of the authentication state
const keys = require('./config/keys');
require('./models/User');
// Include all the passport config here at the top
require('./services/passport');

// Establish a connection to the database
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

mongoose.connection
	.once('open', () => console.log('Database connection has been established'))
	.on('error', error => console.warn('Warning: ', error));

// Generate the express app
const app = express();

// Enabling the use of cookies in our app
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

// This is where we tell passport to use cookies for our authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // Include all of the Authentication routes

// Telling express on which port to listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT);
