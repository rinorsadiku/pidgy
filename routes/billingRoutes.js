const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const { login } = require('../middlewares/middlewares');

module.exports = app => {
	// Put all the Route handlers over here
	app.post('/api/stripe/checkout', login, async (req, res) => {
		// Here will be contained the logic that will handle the token
		// and reach out to the stripe api to complete the transaction

		// Before we continue with creating the charge, we must check
		// if the user is authenticated, and we are doing that through
		// the "requireLogin" middleware

		// 1) Create a charge
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id // the token that we send via POST
		});

		// 2) Update the user credits
		req.user.credits += 5; // Add 5 to current user credits
		const user = await req.user.save(); // Save the updated user

		res.send(user); // Return the updated user
	});
};
