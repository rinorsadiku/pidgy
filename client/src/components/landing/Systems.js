import React from 'react';

import Stripe from './assets/stripe.png';
import SendGrid from './assets/sendgrid.png';
import { FirstBallon, FirstCloud, FirstPlane } from './assets/Svg';

import systems from './css/systems.module.css';
import typo from './css/typography.module.css';

const Systems = () => {
	return (
		<section className={systems['systems']}>
			<div className={`${typo['u-center-text']} ${typo['mb-lg']}`}>
				<h3
					className={`${typo['heading-3']} ${
						typo['heading-3--cloud-top']
					}`}
				>
					Integrated systems
				</h3>
			</div>
			<div className={systems['systems__details']}>
				<div className={typo['card']}>
					<img
						src={Stripe}
						alt="Stripe Logo"
						className={`${typo['card__image']} ${typo['mb-sm']}`}
					/>

					<h5 className={typo['heading-5']}>Stripe</h5>
					<p
						className={`${typo['card__text--narrow']} ${
							typo['paragraph']
						}`}
					>
						Ensuring that our customers can sleep care-free while
						stripe handles their payments.
					</p>
				</div>
				<div className={systems['systems__line']}>&nbsp;</div>
				<div className={typo['card']}>
					<img
						src={SendGrid}
						alt="SendGrid Logo"
						className={`${typo['card__image']} ${typo['mb-sm']}`}
					/>
					<h5 className={typo['heading-5']}>SendGrid</h5>
					<p
						className={`${typo['card__text--narrow']} ${
							typo['paragraph']
						}`}
					>
						The best mailing service ready at your feet, waiting for
						you to make your move.
					</p>
				</div>
			</div>

			<FirstPlane></FirstPlane>
			<FirstBallon></FirstBallon>
			<FirstCloud></FirstCloud>
		</section>
	);
};

export default Systems;
