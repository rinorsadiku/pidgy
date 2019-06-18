const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // This library gives us access to cookies
const passport = require('passport'); // We're going to use this to tell passport what to use to keep track of the authentication state
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');

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

// Using bodyParser to parse the body of any POST or PUT or PATCH request
// and assign the value to req.body of the incoming request
app.use(bodyParser.json());

// This is where we tell passport to use cookies for our authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // Include all of the authentication routes
require('./routes/billingRoutes')(app); // Include all of the billing routes
require('./routes/surveyRoutes')(app); // Include all of the survey handling routes

// Here we will add the configuration to tell our server how to act when in production
// Essentially serving the correct files of the client side when the user asks for them
if (process.env.NODE_ENV === 'production') {
	// 1) Express will serve up production assets like our main.js file, or main.css file

	// If we don't find the route that the user has provided,
	// then the first place we will look for is the /client/build dir
	app.use(express.static('client/build'));

	// How does the express app serve the correct index.html file instead of any static file first? ->
	// It's just a matter of the order of operations

	// First the express app will check to see if it can find a specific route, for example the main.js or main.css
	// and if it doesn't find anything then it will return an index.html file which in this case serves like a 'Catch all' route

	// That's why it's important to tell express to look for the static file first then the index.html

	// 2) Express will serve up the index.html if it doesn't recognize the route
	// React router will take it from there
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Telling express on which port to listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT);
