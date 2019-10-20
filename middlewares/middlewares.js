const { clearHash } = require('../services/cache');

module.exports = {
	login(req, res, next) {
		if (!req.user) {
			return res.status(401).send({ error: 'You must log in!' });
		}

		next();
	},

	credits(req, res, next) {
		if (req.user.credits < 1) {
			return res.status(402).send({ error: 'Not enough credits!' });
		}

		next();
	},

	async cleanCache(req, res, next) {
		await next();
		clearHash(req.user.id);
	}
};
