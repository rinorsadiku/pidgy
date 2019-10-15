import React from 'react';
import typo from './css/typography.module.css';

export const HeadingGroup = props => {
	return (
		<div className={`${typo['heading-group']} ${typo['mb-lg']}`}>
			{props.children}
			<h2 className={typo['heading-2']}>{props.content}</h2>
		</div>
	);
};

export const HeadingThird = props => {
	return (
		<h3
			className={`${typo['heading-3']} ${typo[props.type]} ${
				typo[props.margin]
			}`}>
			{props.content}

			{props.children}
		</h3>
	);
};

export const HeadingThirdDisplay = props => {
	return <h3 className={typo['heading-3--display']}>{props.content}</h3>;
};

export const HeadingFourth = props => {
	return <h4 className={typo['heading-4']}>{props.content}</h4>;
};
