const emailLinks = require('./../emailLinks');
const COLORS = {
	blue: '#2E86DE',
	green: '#27AE60',
	red: '#E74C3C'
};

module.exports = (survey, details) => {
	const { id, custom } = survey;
	const { color, facebook, instagram, twitter, google } = details;
	return `
		<div  style="background: #fcfafa;padding: 10px;margin: 0;">
			<div style="margin: 0 auto;background: #222834;padding: 30px;max-width: 500px;">
				<a 
					target="_blank"
					rel="noopener noreferrer"
					href="https://pidgy.herokuapp.com"
					style="display: block;margin: 0 auto;width: 50px;margin-bottom: 20px;"
				>
					<img
						src="https://i.ibb.co/Dk9c3Vp/logo.png"
						alt="Pidgy"
						style="display: inline-block;width: 100%;"
					/>
				</a>

				<div
					style="max-width: 85%;margin: 0 auto;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
							Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
							'Helvetica Neue', sans-serif;"
				>
					<h1
						
						style="color: #fff;background-color: ${
							COLORS[color]
						};padding: 30px 20px;font-size: 24px;font-weight: 300;text-align: center;margin: 0;"
					>
						Please complete the survey
					</h1>
					<div
						
						style="padding: 9% 8% 7%;background: #fcfafa;"
					>
						<p style="margin: 0;font-size: 18px;color: #222834;">
							${survey.body}
						</p>
						<div
							
							style="margin-top: 22px;text-align: center;"
						>
							${emailLinks({ id, custom }, COLORS[color])}
						</div>
					</div>
				</div>

				<div
					
					style="text-align: center;margin-top: 24px;"
				>
					<a
						href="${facebook}"
						target="_blank"
						rel="noopener noreferrer"
						style="margin-right: 15px;display: inline-block;width: 25px;"
						><img
							src="https://i.ibb.co/QrFzPNm/facebook-icon.png"
							alt="Facebook"
							style="width: 100%;"
					/></a>

					<a
						href="${twitter}"
						target="_blank"
						rel="noopener noreferrer"						
						style="margin-right: 15px;display: inline-block;width: 25px;"
						><img
							src="https://i.ibb.co/Pxcdvqv/twitter-icon.png"
							alt="Twitter"
							style="width: 100%;"
					/></a>

					<a href="${instagram}" target="_blank" rel="noopener noreferrer" style="display: inline-block;width: 25px;"
						><img
							src="https://i.ibb.co/wSyxSqk/instagram-icon.png"
							alt="Instagram"
							style="width: 100%;"
					/></a>
				</div>
			</div>
		</div>

	`;
};
