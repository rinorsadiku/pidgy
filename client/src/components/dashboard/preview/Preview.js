import React from 'react';

import DataContext from '../contexts/DataContext';
import queryString from 'query-string';
import requireAuth from '../requireAuth';

import PreviewDisclaimer from './PreviewDisclaimer';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitSurvey, deleteDraft } from './../../../actions/index';

import { HeadingGroup } from './../Typography';
import { SvgPreview, SvgXSmall } from './../Svg';
import { formEntryFields } from './../form/formFields';

import typo from '../css/typography.module.css';
import p from '../css/preview.module.css';

class Preview extends React.Component {
	static contextType = DataContext;

	renderEntries() {
		return formEntryFields.map(({ name, label }) => {
			return (
				<div key={name} className={p['preview__entry-group']}>
					<span className={p['preview__name']}>{label}</span>
					<p className={p['preview__value']}>
						{this.props.formValues[name]}
					</p>
				</div>
			);
		});
	}

	onDeleteRecipient(recipient) {
		this.context.setData({
			recipients: this.context.recipients.filter(el => el !== recipient)
		});
	}

	renderRecipients() {
		return this.context.recipients.map((recipient, index) => {
			return (
				<li
					key={`${recipient}-${index}`}
					className={p['preview__recipient']}
				>
					{recipient}
					<button
						onClick={() => this.onDeleteRecipient(recipient)}
						className={typo['btn--action']}
					>
						<SvgXSmall />
					</button>
				</li>
			);
		});
	}

	submitSurvey = async () => {
		const recipients = JSON.stringify(this.context.recipients);
		const emailInputs = JSON.stringify(this.context.emailInputs);

		const values = { ...this.props.formValues, recipients, emailInputs };

		// Check and see if there is a draft on the query string, if there is
		// Send a request to delete it
		const params = queryString.parse(this.props.location.search);
		if (params.draft === 'true') {
			await this.props.deleteDraft(params.id);
		}
		await this.props.submitSurvey(values, this.props.history);

		this.context.setData({
			custom: false,
			emailInputs: [],
			recipients: []
		});
	};

	render() {
		return (
			<>
				<HeadingGroup content="Entry Confirmation">
					<SvgPreview styling={typo['heading-svg']} />
				</HeadingGroup>

				<div className={p['preview__main']}>
					<PreviewDisclaimer />

					<div className={p['preview__entries']}>
						{this.renderEntries()}

						<div className={p['preview__entry-group']}>
							<span className={p['preview__name']}>
								Recipients
							</span>
							<ul className={p['preview__recipients']}>
								{this.renderRecipients()}
							</ul>
						</div>

						<div className={typo['btn--group']}>
							<button
								type="button"
								className={`${typo['btn']} ${
									typo['btn--hallow']
								}`}
								onClick={this.props.onCancel}
							>
								Back
							</button>

							<button
								type="button"
								onClick={this.submitSurvey}
								className={typo['btn']}
							>
								Send
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		formValues: state.form.surveyForm.values
	};
};

export default connect(
	mapStateToProps,
	{ submitSurvey, deleteDraft }
)(withRouter(requireAuth(Preview)));
