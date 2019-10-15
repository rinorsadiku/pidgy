import React from 'react';

import FormEntryField from '../form/FormEntryField';
import FormTextareaField from '../form/FormTextareaField';
import { submitData } from '../../../actions';

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import forEach from 'lodash/forEach';

import f from '../css/form.module.css';
import { btn } from '../css/typography.module.css';

class SubmitForm extends React.Component {
	renderFields() {
		return this.props.survey.emailInputs.map(
			({ inputType, inputValue }, index) => {
				return (
					<div key={inputValue} className={f['form__input-group']}>
						<label className={f['form__label']}>{inputValue}</label>
						<Field
							placeholder={inputValue}
							className={f['form__input']}
							name={`input-${index}`}
							component={
								inputType === 'input'
									? FormEntryField
									: FormTextareaField
							}
						/>
					</div>
				);
			}
		);
	}

	onFormSubmit = rawVals => {
		const { email } = this.props;
		let responses = [];

		forEach(rawVals, (value, key) => {
			const index = parseInt(key.split('-')[1]);
			const name = this.props.survey.emailInputs[index].inputValue;
			const val = { name, value };
			responses.push(val);
		});

		const values = {
			email,
			surveyId: this.props.survey._id,
			responses: JSON.stringify(responses)
		};
		this.props.submitData(values, this.props.history);
	};

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
				{this.renderFields()}
				<button type="submit" className={btn}>
					Submit
				</button>
			</form>
		);
	}
}

const reduxFormComponent = reduxForm({
	form: 'submitForm'
})(SubmitForm);

export default connect(
	null,
	{ submitData }
)(reduxFormComponent);
