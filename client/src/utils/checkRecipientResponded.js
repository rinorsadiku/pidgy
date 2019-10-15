export default (email, recipients, history) => {
	const recipient = recipients.filter(recip => recip.email === email)[0];

	if (recipient.responded) history.push('/thanks');
};
