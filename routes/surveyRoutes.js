const _ = require('lodash');
const Path = require('path-parser').default;

// 'url' is a default/intergrated module in the Node.js system
// it has some helpers to parse the url
const { URL } = require('url');

const mongoose = require('mongoose');
const { login, credits } = require('../middlewares/middlewares');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys', login, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false
		});
		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		// Here we will add the logic to parse the path and and to verify that the vote is valid

		// Give the 'Path' a model of sorts of like how our pathname is arranged so that we can follow that pattern to extract all the variables in tha pathname
		const p = new Path('/api/surveys/:surveyId/:choice');

		_.chain(req.body)
			.map(({ url, email }) => {
				// 1) Get the route of the URL
				const match = p.test(new URL(url).pathname);

				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						// The dollar sign, lines up with the recipients $elemMatch operator.
						$set: { 'recipients.$.responded': true },
						last_responded: new Date()
					}
				).exec();
			})
			.value();

		// The reason why we're sending back an empty obj is because sendgrid could care less about what it receives from us after the webhook. It just sends us the webhook and that's it
		res.send({});
	});

	app.post('/api/surveys', login, credits, async (req, res) => {
		// Here we will put the code for creating surveys and sending emails

		// 1) Require in all the post data
		const { title, subject, body, recipients } = req.body;

		// 2) Create a new instance of a survey
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })), // Adding another set of parentheses just so JS is not confused
			_user: req.user.id, // Creating the connection to the user
			dateSent: Date.now()
		});

		// 3) Using the Mailer class to create a "mailer obj" to send the emails
		const mailer = new Mailer(survey, surveyTemplate(survey));

		// Putting everything in a try/catch block to prevent error crashing
		try {
			// 4) Sending the mailer to sendgrid
			await mailer.send();

			// 5) Save the survey in the database
			await survey.save();

			// 6) Deduct one credit from the user credits and save the new user
			req.user.credits -= 1;
			const user = await req.user.save();

			// 7) Send as a response the newly saved user
			res.send(user);
		} catch (err) {
			res.status(422).send({ error: err });
		}
	});
};
