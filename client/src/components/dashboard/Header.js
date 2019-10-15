import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';
import Logo from '../../assets/logo.png';
import styles from './css/header.module.css';
import { SvgCredits } from './Svg';

class Header extends React.Component {
	renderNav() {
		const path = window.location.pathname.split('/')[1];

		return (
			<>
				<Link
					className={`${styles['header__link']} ${
						path !== 'drafts' ? styles['header__link--active'] : ''
					}`}
					to="/surveys"
				>
					Home
				</Link>
				<Link
					className={`${styles['header__link']} ${
						path === 'drafts' ? styles['header__link--active'] : ''
					}`}
					to="/drafts"
				>
					Drafts
				</Link>
			</>
		);
	}

	renderUserContent = () => {
		if (!this.props.auth) return null;

		return (
			<>
				<div className={styles['header__profile']}>
					<img
						className={styles['header__picture']}
						src={this.props.auth.profilePicture}
						alt="Profile"
					/>
					<span className={styles['header__name']}>
						{this.props.auth.name}
					</span>

					<div className={styles['header__expand']}>
						<input
							id="header"
							type="checkbox"
							className={styles['header__checkbox']}
						/>

						<label
							htmlFor="header"
							className={styles['header__label']}
						>
							<svg
								className={styles['header__down']}
								xmlns="http://www.w3.org/2000/svg"
								width="14.124"
								height="9.187"
								viewBox="0 0 14.124 9.187"
							>
								<path
									id="Path_293"
									dataname="Path 293"
									d="M-1.085,1.611H13.039L6.185,10.8h0Z"
									transform="translate(1.085 -1.611)"
									fill="#676f7d"
								/>
							</svg>
						</label>

						<a
							href="/api/logout"
							className={styles['header__logout']}
						>
							Logout
						</a>
					</div>

					<div className={styles['header__credits']}>
						<SvgCredits></SvgCredits>
						<span>: {this.props.auth.credits}</span>
					</div>
				</div>

				<nav className={styles['header__nav']}>{this.renderNav()}</nav>

				<Payments
					style={{
						alignSelf: 'end',
						justifySelf: 'end'
					}}
					btn={styles['header__btn']}
				></Payments>
			</>
		);
	};

	render() {
		return (
			<header className={styles['header']}>
				<div className={styles['header__details']}>
					<img
						className={styles['header__logo']}
						src={Logo}
						alt="Logo"
					/>
					<h1 className={styles['header__heading']}>Dashboard</h1>
				</div>

				{this.renderUserContent()}
			</header>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);
