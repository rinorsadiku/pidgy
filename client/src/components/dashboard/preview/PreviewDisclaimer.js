import React from 'react';
import { preview__disclaimer } from '../css/preview.module.css';

export default () => {
	return (
		<p className={preview__disclaimer}>
			<span>Disclaimer:</span>This is a "no return" process. Once you
			submit this form, the email crafted will immediately be sent
			directly to your recipients, and changes will be hardly ever made.
		</p>
	);
};
