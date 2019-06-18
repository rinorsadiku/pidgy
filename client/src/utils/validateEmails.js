const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
	// Series of steps to validate emails:
	// 1) Take the comma-seperated emails string and split wherever the commas are located
	// 2) Map through each email and remove the white spaces to the left and right
	// 3) Take each email and run it through a filter() method ->
	// The filter method will return false if the email is nicely formatted and dump it out of the array and return true if the email is invalid and keep the email in the array ->
	// So that we display them as an error message to the user

	const invalidEmails = emails
		.split(',')
		.map(email => email.trim())
		.filter(email => {
			if (email !== '') {
				return re.test(email) === false;
			}

			return false;
		});

	if (invalidEmails.length) {
		// Returning the error message to the user;
		return `These emails are invalid: ${invalidEmails}`;
	}

	return;
};
