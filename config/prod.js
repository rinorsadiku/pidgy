// prod.js - production keys here
module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	mongoURI: process.env.MONGO_URI,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	cookieKey: process.env.COOKIE_KEY,
	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY,
	sendGridKey: process.env.SEND_GRID_KEY,
	redirectDomain: process.env.REDIRECT_DOMAIN
};
