import React from 'react';
import Dashboard from '../Dashboard';

import requireAuth from '../requireAuth';

import { fetchData, fetchSurvey } from '../../../actions';
import { connect } from 'react-redux';

import { HeadingGroup, HeadingThird } from '../Typography';
import { SvgResults } from '../Svg';

import typo from '../css/typography.module.css';
import { results__main, results__title } from '../css/results.module.css';
import ResultsList from './ResultsList';

class SurveyResults extends React.Component {
	async componentWillMount() {
		const { surveyId } = this.props.match.params;
		await this.props.fetchData(surveyId);
		await this.props.fetchSurvey(surveyId);
	}

	renderTitle() {
		if (!this.props.survey) return '';
		return <h2 className={results__title}>{this.props.survey.title}</h2>;
	}

	render() {
		return (
			<Dashboard>
				<HeadingGroup content="Survey Results">
					<SvgResults styling={typo['heading-svg']} />
				</HeadingGroup>

				<div className={results__main}>
					<HeadingThird
						type="heading-3--line"
						margin="mb-md"
						content="Survey Results"
					/>

					{this.renderTitle()}

					<ResultsList data={this.props.data} />
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
