import React from 'react';
import Dashboard from '../Dashboard';
import SubmitForm from './SubmitForm';
import checkValidEmail from '../../../utils/checkValidEmail';
import checkRecipientResponded from '../../../utils/checkRecipientResponded';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { HeadingGroup, HeadingThird } from '../Typography';
import { SvgPreview } from '../Svg';

import s from '../css/submit.module.css';
import typo from '../css/typography.module.css';
import { fetchSurvey } from '../../../actions/index';

class Submit extends React.Component {
	state = {
		form: false
	};

	checkValidity() {
		const { history } = this.props;
		const { email } = this.props.match.params;

		// 1) Check if there is a survey
		if (!this.props.survey) history.push('/404');

		// 2) Check if a the email is valid
		checkValidEmail(email, this.props.survey.recipients, history);

		// 3) Check if that recipient has responded
		checkRecipientResponded(email, this.props.survey.recipients, history);
	}

	async componentDidMount() {
		await this.props.fetchSurvey(this.props.match.params.surveyId);
		this.checkValidity();
	}

	renderContent() {
		if (!this.state.form) {
			return (
				<div className={s['submit__box']}>
					<p className={s['submit__confirm']}>
						Can you please confirm that{' '}
						<span>{this.props.match.params.email}</span> is your
						email?
					</p>
					<div className={s['submit__buttons']}>
						<button
							onClick={() => this.setState({ form: true })}
							className={typo['btn']}
						>
							Yes, this is it
						</button>
						<Link
							to="/thanks"
							className={`${typo['btn']} ${typo['btn--grey']} ${
								typo['btn--link']
							}`}
						>
							That's not mine
						</Link>
					</div>
				</div>
			);
		}

		return (
			<SubmitForm
				email={this.props.match.params.email}
				survey={this.props.survey}
				history={this.props.history}
			/>
		);
	}

	render() {
		return (
			<Dashboard>
				<HeadingGroup content="Survey Submission">
					<SvgPreview styling={typo['heading-svg']} />
				</HeadingGroup>

				<div className={s['submit']}>
					<HeadingThird
						type="heading-3--line"
						margin="mb-md"
						content="Submit"
					/>

					{this.renderContent()}
				</div>
			</Dashboard>
		);
	}
}

const mapStateToProps = ({ surveys }) => {
	return {
		survey: surveys
	};
};

export default connect(
	mapStateToProps,
	{ fetchSurvey }
)(withRouter(Submit));
