import React from 'react';

import { reduxForm } from 'redux-form';
import requireAuth from '../requireAuth';

import Dashboard from './../Dashboard';
import Form from '../form/Form';
import Preview from '../preview/Preview';

import DataContext from '../contexts/DataContext';

class SurveyNew extends React.Component {
	setData = data => {
		this.setState(data);
	};

	state = {
		showFormReview: false,
		recipients: [],
		emailInputs: [],
		setData: this.setData,
		custom: false
	};

	renderContent() {
		if (this.state.showFormReview) {
			return (
				<DataContext.Provider value={this.state}>
					<Preview
						onCancel={() =>
							this.setState({ showFormReview: false })
						}
					/>
				</DataContext.Provider>
			);
		}

		return (
			<DataContext.Provider value={this.state}>
				<Form
					onSurveySubmit={() =>
						this.setState({ showFormReview: true })
					}
				/>
			</DataContext.Provider>
		);
	}

	render() {
		return <Dashboard>{this.renderContent()}</Dashboard>;
	}
}

export default reduxForm({
	form: 'surveyForm'
})(requireAuth(SurveyNew));
