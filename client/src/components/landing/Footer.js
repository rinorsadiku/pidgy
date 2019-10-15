import React from 'react';

import LogoPurple from '../../assets/logo-purple.png';

import footer from './css/footer.module.css';
import typo from './css/typography.module.css';
import { logo } from './css/header.module.css';

const Footer = () => {
	return (
		<footer className={footer['footer']}>
			<div
				className={`${footer['footer__line']} ${typo['mb-xlg']}`}></div>

			<div className={`${footer['u-center-text']} ${typo['mb-sm']}`}>
				<h3 className={typo['heading-3']}>The end</h3>
			</div>

			<a
				href="/auth/google"
				className={`${typo['btn']} ${typo['mb-lg']}`}>
				Signup
			</a>

			<div className={footer['credits']}>
				<img className={logo} src={LogoPurple} alt="Logo in purple" />
				<p className="copyright">Pidgy, All rights reserved © 2019</p>
			</div>
		</footer>
	);
};

export default Footer;
