import React from 'react';
import styles from './css/base.module.css';

import Header from './Header';
import base from './css/base.module.css';

const Dashboard = props => {
	// The Dashboard component has some sub-routes to render the different pages and keep the header for each one
	return (
		<div className={styles['app-container']}>
			<Header></Header>

			<main className={base.default}>{props.children}</main>
		</div>
	);
};

export default Dashboard;
