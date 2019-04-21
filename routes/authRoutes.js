const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		// We use the passport.authenticate() method to initialize the authentication process
		// The first argument is the strategy that you want to use
		// The second argument is the so-called options
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	// Once passport notices that there is a code in the URL
	// they do not make another authentication request
	// instead they try to fetch the 'profile' and the 'email' scoped data
	// passport.authenticate() is a middleware btw
	// And this is how we attach middlewares to specific routes
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			// Redirecting the user to the main dashboard after they have logged in
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		// This logout function is attached automatically to the request object by passport
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		// res.send(req.session);
		res.send(req.user);
	});
};
