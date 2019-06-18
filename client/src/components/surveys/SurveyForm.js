// SurveyForm shows a form for a user to add input
import React from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import SurveyField from './SurveyField'; // Custom input component for reduxForm
import formFields from './formFields'; // Field configuration object

class SurveyForm extends React.Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					type="text"
					name={name}
					label={label}
					component={SurveyField}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				{/* The handle submit function is given to us by reduxForm. handleSubmit does a few checks before submitting, like errors and all that */}
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

const validate = values => {
	// The function takes a single argument called values which are the actual values that the user submits the form

	// 1) If this object returns nothing, reduxForm will think that there were no errors
	// 2) If it returns a property name the same as the name of a field, reduxForm form will think that that field is invalid and won't submit the form
	const errors = {};

	// -- Add validation to check and see if the emails are formatted correctly
	errors.emails = validateEmails(values.recipients || '');

	// -- Add validation to see if the user has supplied a value for each of the fields
	_.each(formFields, ({ name, errorMessage }) => {
		if (!values[name]) {
			errors[name] = errorMessage;
		}
	});

	return errors;
};

// Using the reduxForm helper to wire up redux form with this component and soon with the whole global redux reducer
export default reduxForm({
	form: 'surveyForm', // The name of the form which we will use to target it
	validate, // Everytime the user submits the form, reduxForm will run the function under the validate property and return the errors if there are any!
	destroyOnUnmount: false // Do not kill this form along with its values if the user leaves this page
})(SurveyForm);
