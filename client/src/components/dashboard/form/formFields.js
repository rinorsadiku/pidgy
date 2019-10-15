import FacebookIcon from '../assets/facebook-icon.png';
import TwitterIcon from '../assets/twitter-icon.png';
import InstagramIcon from '../assets/instagram-icon.png';

import TemplateBlue from '../assets/template-blue.png';
import TemplateGreen from '../assets/template-green.png';
import TemplateRed from '../assets/template-red.png';

export const formPluginFields = [
	{
		acro: 'fb',
		media: 'facebook',
		image: FacebookIcon
	},
	{
		acro: 'tw',
		media: 'twitter',
		image: TwitterIcon
	},
	{
		acro: 'insta',
		media: 'instagram',
		image: InstagramIcon
	}
];

export const formTemplateFields = [
	{
		color: 'blue',
		image: TemplateBlue
	},
	{
		color: 'green',
		image: TemplateGreen
	},
	{
		color: 'red',
		image: TemplateRed
	}
];

export const formEntryFields = [
	{
		label: 'Survey Title',
		name: 'title',
		errorMessage: 'Please provide a title',
		type: 'input'
	},
	{
		label: 'Email Subject',
		name: 'subject',
		errorMessage: 'Please provide a subject line',
		type: 'input'
	},
	{
		label: 'Email Body',
		name: 'body',
		errorMessage: 'Please provide an email body',
		type: 'textarea'
	}
];
