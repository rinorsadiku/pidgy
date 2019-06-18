const keys = require('./../../config/keys');

module.exports = survey => {
	return `
		<html>
		<body style="font-family: sans-serif; color: #f1f1f1; background-color: #222834; text-align: center; padding: 40px 20px;">
				<div>
					<h3 style="font-size: 30px; color: #f1f1f1;">I'd like your input</h3>
					<p style="font-size: 25px; color: #f1f1f1;">Please answer the following question!</p>
					<p style="font-size: 20px; color: #f1f1f1; padding: 0 30px">${survey.body}</p>
					<div style="text-align: center;">
						<a style="text-decoration: none; color: #222834; padding: 10px 40px; background-color: #f1f1f1; font-size: 18px; margin-right: 20px;" href="${
							keys.redirectDomain
						}/api/surveys/${survey.id}/yes">Yes</a>
						<a style="text-decoration: none; color: #222834; padding: 10px 40px; background-color: #f1f1f1; font-size: 18px;" href="${
							keys.redirectDomain
						}/api/surveys/${survey.id}/no">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
