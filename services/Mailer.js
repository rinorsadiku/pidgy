const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// Centralizing all the logic for defining a mailer that takes care of formatting and refining data for email sent

// helper.Mail has a lot of methods that we are going to use to send email
class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) {
		// Note: everytime helper.[something] is used,
		// we're in a way formatting some data using the sendgrid helpers
		// in order to make them 'accessible' to sendgrid

		// Initializing the constructors in the helper.Mail class
		super();

		this.sgAPI = sendgrid(keys.sendGridKey); // communicating to the SendGrid API

		this.from_email = new helper.Email('no-reply@pidgy.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients); // Helper function to format all recipient emails

		// addContent() is a helper function from helper.Mail
		this.addContent(this.body); // Adding the this.body to the mailer, in a way registering it to the mailer
		this.addClickTracking(); // Enabling click-tracking inside our emails
		this.addRecipients(); // Adding the recipients to the mailer
	}

	formatAddresses(recipients) {
		return recipients.map(({ email }) => new helper.Email(email));
	}

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true); // "Choosing" click tracking

		trackingSettings.setClickTracking(clickTracking); // Setting click tracking as our tracking settings

		this.addTrackingSettings(trackingSettings); // Finalizing click tracking
	}

	addRecipients() {
		// Defining a sort of container that will hold all of our recipients in the mailer
		const personalize = new helper.Personalization();

		// Adding each recipient to that container
		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		});

		// Finalizing the container to work with the mailer
		this.addPersonalization(personalize);
	}

	// The function that will send the mailer to sendgrid, that will indeed email all of our recipients
	async send() {
		// Create a request to send to sendgrid
		const request = this.sgAPI.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		// Send the request and wait for the response
		const response = await this.sgAPI.API(request);

		// Return the response that came back from the sendgrid
		return response;
	}
}

module.exports = Mailer;
