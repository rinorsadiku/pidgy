const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default rawEmail => {
	const email = rawEmail.trim();

	if (email !== '') {
		return re.test(email);
	}

	return false;
};
