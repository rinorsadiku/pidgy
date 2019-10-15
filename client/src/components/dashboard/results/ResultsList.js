import React from 'react';
import r from '../css/results.module.css';
import typo from '../css/typography.module.css';

class ResultsList extends React.Component {
	renderContent(responses) {
		return responses.map(({ name, value }, index) => {
			return (
				<div key={`${name}/${index}`} className={r['results__content']}>
					<h5 className={r['results__input-title']}>
						<span>{index + 1})</span>
						{name}
					</h5>
					<p
						className={`${typo['paragraph']} ${
							typo['paragraph--scroll']
						}`}
					>
						{value}
					</p>
				</div>
			);
		});
	}
	renderItems() {
		if (this.props.data.length === 0) return <p>There are no results</p>;

		return this.props.data.map(({ email, responses }, index) => {
			return (
				<div key={`${email}-${index}`} className={r['results__item']}>
					<h4 className={r['results__email']}>{email}</h4>
					{this.renderContent(responses)}
				</div>
			);
		});
	}

	render() {
		return <div className={r['results__list']}>{this.renderItems()}</div>;
	}
}

export default ResultsList;
