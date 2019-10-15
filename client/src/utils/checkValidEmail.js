export default (email, recipients, history) => {
	const checkEmail = recip => recip.email === email;
	const valid = recipients.some(checkEmail);

	if (!valid) history.push('/404');
};
