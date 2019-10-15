const { login } = require('../middlewares/middlewares');
const mongoose = require('mongoose');
const Draft = mongoose.model('drafts');

module.exports = app => {
	app.get('/api/drafts', login, async (req, res) => {
		try {
			const drafts = await Draft.find({
				_user: req.user.id
			});

			res.send(drafts);
		} catch (err) {
			res.status(422).send({ error: err });
		}
	});

	app.get('/api/drafts/:id', login, async (req, res) => {
		try {
			const draft = await Draft.findOne({
				_id: req.params.id
			});

			res.send(draft);
		} catch (err) {
			res.status(422).send({ error: err });
		}
	});

	app.post('/api/drafts', login, async (req, res) => {
		const {
			title,
			body,
			subject,
			custom,
			sender,
			facebook,
			instagram,
			twitter,
			template
		} = req.body;
		const recipients = JSON.parse(req.body.recipients);
		const emailInputs = JSON.parse(req.body.emailInputs);

		// // Here we will add a new draft
		// req.body.recipients = JSON.parse(req.body.recipients);
		// req.body.emailInputs = JSON.parse(req.body.emailInputs);

		const draft = new Draft({
			title,
			body,
			subject,
			custom,
			sender,
			facebook,
			instagram,
			twitter,
			template,
			recipients,
			emailInputs,
			_user: req.user.id
		});
		await draft.save();

		res.send(draft);
	});

	app.delete('/api/drafts/:draftId', login, async (req, res) => {
		try {
			// Delete the survey and the email Inputs that correspond to it
			await Draft.findByIdAndDelete(req.params.draftId);

			res.send({});
		} catch (err) {
			console.log('Error' + err);
		}
	});

	app.put('/api/drafts/:draftId', login, async (req, res) => {
		try {
			req.body.recipients = JSON.parse(req.body.recipients);
			req.body.emailInputs = JSON.parse(req.body.emailInputs);
			const draft = await Draft.findByIdAndUpdate(req.params.draftId, {
				...req.body
			});
			res.send({ draft });
		} catch (err) {
			console.log('Error' + err);
		}
	});
};
