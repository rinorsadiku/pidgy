const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// In order for serializeUser and deserializeUser to work we need to instruct
// passport that we want it to manage all of our authentication by using a cookie
passport.serializeUser((user, done) => {
	// When the user logs in, we will take its ID and encode it
	// Further on the user will use that encoded ID and will make
	// any follow up requests with it
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	// After user makes a follow up requrest after it has logged in
	// that's when we take the token that we crafted using the id we received
	// and we extract the id of that token and we find the user in the db according to that token
	User.findById(id).then(user => done(null, user));
});

// Telling passport to use the google strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback', // specify where passport should handle the user when he comes back to our application
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ providerId: profile.id }).then(existingUser => {
				if (existingUser) {
					console.log(`Logged in as ${existingUser.name}`);
					// Telling passport that there were no errors and we found a user
					done(null, existingUser);
				} else {
					new User({
						providerId: profile.id,
						name: profile.displayName,
						email: profile.emails[0].value,
						profilePicture: profile.photos[0].value,
						provider: profile.provider
					})
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
