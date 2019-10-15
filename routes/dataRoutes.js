const mongoose = require('mongoose');
const Data = mongoose.model('data');
const Survey = mongoose.model('surveys');

const { login } = require('../middlewares/middlewares');

module.exports = app => {
	app.get('/api/data/:surveyId', login, async (req, res) => {
		try {
			const data = await Data.find({ _survey: req.params.surveyId });

			res.send(data);
		} catch (err) {
			console.log('Data Fetch Error: ' + err);
			res.status(422).send({ error: err });
		}
	});

	app.post('/api/data', async (req, res) => {
		// 1) Require in all the data
		const { email, surveyId } = req.body;
		const responses = JSON.parse(req.body.responses);

		try {
			// 2) Create a new record
			const data = new Data({
				email,
				_survey: surveyId,
				responses
			});

			// 3) See if it finds a user with the email and responded of false,
			// and after it has saved the user then you can save the data
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: { email: email, responded: false }
					}
				},
				{
					// The dollar sign, lines up with the recipients $elemMatch operator.
					$set: { 'recipients.$.responded': true },
					last_responded: new Date()
				}
			)
				.then(survey => {
					if (survey) data.save();
				})
				.then(() => res.status(200).send({}));
		} catch (err) {
			console.log(err);
		}
	});
};
