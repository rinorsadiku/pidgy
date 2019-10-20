import React from 'react';
import { surveys } from '../css/surveys.module.css';
import SurveyItem from './SurveyItem';

class SurveyList extends React.Component {
	renderSurveys = () => {
		if (!Array.isArray(this.props.surveys) || !this.props.surveys.length)
			return 'There are no surveys';

		return this.props.surveys.map(survey => {
			return <SurveyItem key={survey._id} survey={survey}></SurveyItem>;
		});
	};

	render() {
		return <div className={surveys}>{this.renderSurveys()}</div>;
	}
}

export default SurveyList;
