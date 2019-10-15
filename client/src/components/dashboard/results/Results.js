import React from 'react';
import Dashboard from '../Dashboard';

import requireAuth from '../requireAuth';

import { fetchData, fetchSurvey } from '../../../actions';
import { connect } from 'react-redux';

import { HeadingGroup, HeadingThird } from '../Typography';
import { SvgResults } from '../Svg';

import typo from '../css/typography.module.css';
import r from '../css/results.module.css';

class SurveyResults extends React.Component {
	async componentDidMount() {
		const { surveyId } = this.props.match.params;
		await this.props.fetchSurvey(surveyId);
		await this.props.fetchData(surveyId);
	}

	renderTitle() {
		if (!this.props.survey) return '';
		return (
			<h2 className={r['results__title']}>{this.props.survey.title}</h2>
		);
	}

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
		if (!this.props.data) return 'loading...';

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
		return (
			<Dashboard>
				<HeadingGroup content="Survey Results">
					<SvgResults styling={typo['heading-svg']} />
				</HeadingGroup>

				<div className={r['results__main']}>
					<HeadingThird
						type="heading-3--line"
						margin="mb-md"
						content="Survey Results"
					/>

					{this.renderTitle()}

					<div className={r['results__list']}>
						{this.renderItems()}
					</div>
				</div>
			</Dashboard>
		);
	}
}

const mapStateToProps = ({ data, surveys }) => {
	return {
		data,
		survey: surveys
	};
};

export default connect(
	mapStateToProps,
	{ fetchData, fetchSurvey }
)(requireAuth(SurveyResults));
