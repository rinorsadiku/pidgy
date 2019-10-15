import React from 'react';
import Dashboard from './Dashboard';

import typo from './css/typography.module.css';
import { Link } from 'react-router-dom';

const Thanks = () => {
	return (
		<Dashboard>
			<div className={typo['message']}>
				<h3 className={typo['message__title']}>Thank You</h3>
				<p className={typo['message__text']}>
					You just did a great deed my friend!
				</p>
				<Link className={`${typo['btn']} ${typo['btn--link']}`} to="/">
					Visit our page
				</Link>
			</div>
		</Dashboard>
	);
};

export default Thanks;
