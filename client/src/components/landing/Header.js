import React from 'react';

import Logo from '../../assets/logo.png';
import PhoneMessages from './assets/phone-messages.png';

import header from './css/header.module.css';
import typo from './css/typography.module.css';

const Header = () => {
	return (
		<header className={header['header']}>
			<nav className={header['header__navigation']}>
				<img src={Logo} alt="Pidgy Logo" className={header['logo']} />
				<a href="/auth/google" className={typo['btn']}>
					Login
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="22.094"
							height="12.249"
							viewBox="0 0 22.094 12.249">
							<path
								fill="none"
								stroke="#fff"
								strokeWidth="1.7"
								d="M164.859 787.785l10.446 10.446 10.446-10.446"
								transform="translate(-164.257 -787.184)"
							/>
						</svg>
					</span>
				</a>
			</nav>
			<div className={header['header__content']}>
				<div className={header['header__description']}>
					<h1
						className={`${typo['heading-1']} ${
							typo['heading-1--white']
						} ${typo['mb-sm']}`}>
						Collect feedback efficiently
					</h1>
					<h2
						className={`${typo['heading-2']} ${
							typo['heading-2--white']
						} ${typo['mb-md']}`}>
						Send surveys, get answers and grow your business
					</h2>
					<a
						href="/auth/google"
						className={`${typo['btn']} ${typo['btn--heavy']}`}>
						Get started
					</a>
				</div>
				<img
					src={PhoneMessages}
					alt="Phone Graphic"
					className={header['header__graphic']}
				/>
			</div>
		</header>
	);
};

export default Header;
