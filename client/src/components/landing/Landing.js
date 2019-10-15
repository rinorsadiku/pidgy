import React from 'react';

import Header from './Header';
import Systems from './Systems';
import Roadtrip from './Roadtrip';
import Footer from './Footer';

import base from './css/base.module.css';

class Landing extends React.Component {
	render() {
		return (
			<main className={base['landing-container']}>
				<Header />
				<Systems />
				<Roadtrip />
				<Footer />
			</main>
		);
	}
}

export default Landing;
