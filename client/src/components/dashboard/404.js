import React from 'react';
import Dashboard from './Dashboard';

import typo from './css/typography.module.css';
import { Link } from 'react-router-dom';

const Thanks = () => {
	return (
		<Dashboard>
			<div className={typo['message']}>
				<h3 className={typo['message__title']}>404</h3>
				<p className={typo['message__text']}>
					OOPS. Looks like the page you're looking for, does not
					exists.
				</p>
				<Link
					className={`${typo['btn']} ${typo['btn--link']}`}
					to="/surveys"
				>
					Go Back
				</Link>
			</div>
		</Dashboard>
	);
};

export default Thanks;
