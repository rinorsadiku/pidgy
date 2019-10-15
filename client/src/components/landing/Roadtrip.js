import React from 'react';

import SurveyCreation from './assets/survey-creation.png';
import Feedback from './assets/feedback.png';
import Growth from './assets/growth.png';
import {
	SecondBallon,
	ThirdBallon,
	SecondCloud,
	ThirdCloud,
	ThirdPlane,
	FourthPlane
} from './assets/Svg';

import roadtrip from './css/roadtrip.module.css';
import typo from './css/typography.module.css';

const Roadtrip = () => {
	return (
		<section className={roadtrip['roadtrip']}>
			<div className={`${typo['u-center-text']} ${typo['mb-xlg']}`}>
				<h3
					className={`${typo['heading-3']} ${
						typo['heading-3--cloud-bottom']
					}`}>
					A simple roadtrip
				</h3>
			</div>

			<div className={roadtrip['roadtrip__steps']}>
				<div className={roadtrip['roadtrip__step--1']}>
					<div className={typo['card']}>
						<span className={typo['card__label']}>01</span>
						<h5 className={typo['heading-5']}>Survey Creation</h5>
						<p
							className={`${typo['card__text--wide']} ${
								typo['paragraph']
							}`}>
							The first step is to create the survey that your
							subscribers will receive. Make sure you let them
							know what you want back from them.
						</p>
					</div>

					<figure className={roadtrip['roadtrip__graphic--1']}>
						<img
							src={SurveyCreation}
							alt="Survey creation"
							className={roadtrip['roadtrip__image']}
						/>
					</figure>
				</div>
				<figure
					className={roadtrip['roadtrip__stairs--right']}></figure>
				<div className={roadtrip['roadtrip__step--2']}>
					<figure className={roadtrip['roadtrip__graphic--2']}>
						<img
							className={roadtrip['roadtrip__image']}
							src={Feedback}
							alt="Receieving"
						/>
					</figure>

					<div className={typo['card']}>
						<span className={typo['card__label']}>02</span>
						<h5 className={typo['heading-5']}>
							Receieving Feedback
						</h5>
						<p
							className={`${typo['card__text--wide']} ${
								typo['paragraph']
							}`}>
							After the survey has been sent and users have
							replied, the next step is receiving back the
							replies. That will come as analysis in the app
							dashboard
						</p>
					</div>
				</div>
				<figure className={roadtrip['roadtrip__stairs--left']}></figure>
				<div className={roadtrip['roadtrip__step--3']}>
					<div className={typo['card']}>
						<span className={typo['card__label']}>03</span>
						<h5 className={typo['heading-5']}>Grow From There</h5>
						<p
							className={`${typo['card__text--wide']} ${
								typo['paragraph']
							}`}>
							Make the necessary valuations to your business or
							corp. in order to get the absolute best out of it.
							Find what the people want in no time
						</p>
					</div>

					<figure className={roadtrip['roadtrip__graphic--3']}>
						<img
							src={Growth}
							alt="Growth"
							className={roadtrip['roadtrip__image']}
						/>
					</figure>
				</div>
			</div>

			<ThirdPlane></ThirdPlane>

			<SecondBallon></SecondBallon>

			<ThirdBallon></ThirdBallon>

			<SecondCloud></SecondCloud>

			<FourthPlane></FourthPlane>

			<ThirdCloud></ThirdCloud>
		</section>
	);
};

export default Roadtrip;
