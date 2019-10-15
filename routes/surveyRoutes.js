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
const Data = mongoose.model('data');

module.exports = app => {
	app.get('/api/surveys', login, async (req, res) => {
		try {
			const surveys = await Survey.find({ _user: req.user.id });

			res.send(surveys);
		} catch (err) {
			res.status(422).send({ error: err });
		}
	});

	app.get('/api/surveys/:id', async (req, res) => {
		const survey = await Survey.findOne({
			_id: req.params.id
		});

		res.send(survey);
	});

	app.delete('/api/surveys/:surveyId', login, async (req, res) => {
		try {
			// Delete the survey and the email Inputs that correspond to it
			await Survey.findByIdAndDelete({
				_id: req.params.surveyId
			});

			await Data.findOneAndDelete({
				_survey: req.params.surveyId
			});

			res.send({});
		} catch (err) {
			console.log('Error' + err);
		}
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.redirect('/thanks');
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
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
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
		// Here we will put all the code for creating and sending surveys

		// 1) Require in all the code from the client-side form
		const {
			title,
			body,
			subject,
			custom,
			template,
			facebook,
			twitter,
			instagram,
			sender
		} = req.body;

		const recipients = JSON.parse(req.body.recipients);
		const emailInputs = JSON.parse(req.body.emailInputs);

		// 2) Create a new instance of survey
		const survey = new Survey({
			title,
			body,
			subject,
			recipients: recipients.map(email => ({
				email
			})),
			_user: req.user.id,
			custom,
			emailInputs: emailInputs,
			dateSent: Date.now()
		});

		// 3) Here we will create the mailer and also pass the necessary arguments to the surveyTemplate
		const details = {
			color: template,
			facebook,
			twitter,
			instagram
		};
		const mailer = new Mailer(
			survey,
			sender,
			surveyTemplate(survey, details)
		);

		try {
			// 4) Sending the mailer to sendgrid
			await mailer.send();

			// 5) Saving the survey in the database
			await survey.save();

			// 6) Deducting one credit to the user credits
			req.user.credits -= 1;
			const user = await req.user.save();

			// 7) Send the user
			res.send(user);
		} catch (err) {
			console.log(err);
			res.status(422).send({ error: err });
		}
	});
};
