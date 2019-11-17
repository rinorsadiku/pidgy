import React from 'react';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { each } from 'lodash';

import requireAuth from '../requireAuth';
import DataContext from '../contexts/DataContext';

import FormCheckbox from './FormCheckbox';
import FormCustomize from './FormCustomize';
import FormEntries from './FormEntries';
import FormGroup from './FormGroup';
import FormTemplates from './FormTemplates';
import FormField from './FormField';
import FormPlugins from './FormPlugins';
import FormRecipients from './FormRecipients';

import { HeadingGroup, HeadingThird } from './../Typography';
import { SvgForm } from './../Svg';

import { fetchDraft, submitDraft, updateDraft } from '../../../actions/index';
import { form, form__actions, form__sender } from '../css/form.module.css';
import typo from '../css/typography.module.css';
import FormRecipientInput from './FormRecipientInput';
import { formEntryFields } from './formFields';

class Form extends React.Component {
	static contextType = DataContext;

	async componentDidMount() {
		this.params = queryString.parse(this.props.location.search);

		if (this.params.draft === 'true') {
			await this.props.fetchDraft(this.params.id);

			if (this.props.draft === {}) this.props.history.push('/404');

			const { custom, emailInputs, recipients } = this.props.draft;
			this.context.setData({
				custom,
				emailInputs,
				recipients
			});
		}
	}

	onUserLeaveAttempt = () => {
		const { history } = this.props;

		const leave = window.confirm(
			"Warning: You have populated fields in your form. By pressing 'Ok' you agree to leave this page and therefore your crafted survey will be lost.\nPlease draft your survey to prevent this from happening."
		);

		return leave ? history.push('/surveys') : null;
	};

	onFormSubmit = () => {
		// And here we will update the state in the parent component
		this.props.onSurveySubmit();
	};

	onDraftClick = async raw => {
		const { recipients, emailInputs } = this.context;
		const values = {
			...raw,
			recipients: JSON.stringify(recipients),
			emailInputs: JSON.stringify(emailInputs)
		};

		if (this.props.draft) {
			if (this.props.draft._id === this.params.id)
				this.props.updateDraft(this.params.id, values);
			window.alert('Draft updated.');

			return;
		}

		await this.props.submitDraft(values);
		window.alert('Survey added to drafts.');
	};

	render() {
		return (
			<>
				<HeadingGroup content="Survey Creation Form">
					<SvgForm styling={typo['heading-svg']} />
				</HeadingGroup>

				<form
					onSubmit={this.props.handleSubmit(this.onFormSubmit)}
					className={form}
				>
					<FormGroup>
						<HeadingThird
							type="heading-3--bottom"
							margin="mb-md"
							content="Email Customization"
						>
							<FormCheckbox />
						</HeadingThird>

						<FormCustomize />
					</FormGroup>

					<FormGroup>
						<HeadingThird
							type="heading-3--line"
							margin="mb-md"
							content="Email Template"
						/>

						<FormTemplates />
					</FormGroup>

					<FormGroup>
						<HeadingThird
							type="heading-3--line"
							margin="mb-md"
							content="Social Media Plug-In"
						/>

						<FormPlugins />
					</FormGroup>

					<FormGroup>
						<HeadingThird
							type="heading-3--line"
							margin="mb-md"
							content="Sender Email"
						/>

						<Field
							name="sender"
							type="text"
							className={form__sender}
							component={FormField}
						/>
					</FormGroup>

					<FormGroup>
						<HeadingThird
							type="heading-3--line"
							margin="mb-md"
							content="Entries"
						/>

						<FormEntries />
						<FormRecipientInput />

						<div
							className={`${typo['btn--group']} ${typo['btn--downward']}`}
						>
							<button
								type="button"
								className={`${typo['btn']} ${typo['btn--hallow']}`}
								onClick={this.onUserLeaveAttempt}
							>
								Cancel
							</button>

							<div className={form__actions}>
								<button
									type="button"
									className={`${typo['btn']} ${typo['btn--warning']}`}
									onClick={this.props.handleSubmit(
										this.onDraftClick
									)}
								>
									Draft
								</button>
								<button type="submit" className={typo['btn']}>
									Continue
								</button>
							</div>
						</div>
					</FormGroup>

					<FormRecipients />
				</form>
			</>
		);
	}
}

const validate = values => {
	const errors = {};

	if (!values['sender']) {
		errors['sender'] = 'You must provide a sender email';
	}

	each(formEntryFields, ({ name, errorMessage }) => {
		if (!values[name]) {
			errors[name] = errorMessage;
		}
	});

	return errors;
};

const mapStateToProps = ({ drafts }) => {
	const params = queryString.parse(window.location.search);
	if (params.draft === 'true') {
		const draft = drafts[params.id];
		return {
			initialValues: { ...draft },
			draft
		};
	}

	return {
		initialValues: { sender: 'no-reply@pidgy.com' }
	};
};

const routedComponent = reduxForm({
	form: 'surveyForm',
	destroyOnUnmount: false,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
	validate
})(withRouter(Form));

export default connect(mapStateToProps, {
	submitDraft,
	fetchDraft,
	updateDraft
})(requireAuth(routedComponent));
