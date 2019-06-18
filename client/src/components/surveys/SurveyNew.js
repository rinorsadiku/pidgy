// SurveyNew shows SurveyForm and SurveyFormReview
import React from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {
	state = {
		// Using component-level state to toggle between showing and hiding the SurveyFormReview -> default == hide the Form Review
		showFormReview: false
	};

	// Using this helper function to add the logic for serving the proper component
	renderContent() {
		if (this.state.showFormReview) {
			return (
				<SurveyFormReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			);
		}

		return (
			<SurveyForm
				onSurveySubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	// Once the user navigates away from the SurveyNew component,
	// if this component is unmounted, then we immediately dump out all the form data
	// Because we haven't specified a setting that permits reduxForm to dump form values
	// We have to use the same form name.
	// This is kinda an exploit of the reduxForm
	form: 'surveyForm'
})(SurveyNew);
