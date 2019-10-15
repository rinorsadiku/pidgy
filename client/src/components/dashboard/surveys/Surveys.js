import React from 'react';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import SurveyList from './SurveyList';
import Metrics from './Metrics';
import Dashboard from '../Dashboard';
import requireAuth from '../requireAuth';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSurveys } from '../../../actions';

import { HeadingGroup, HeadingThird } from '../Typography';
import { SvgWifi, SvgPlusBig } from './../Svg';

import dash from '../css/dashboard.module.css';
import typo from '../css/typography.module.css';

class Surveys extends React.Component {
	state = {
		surveys: [],
		recipients: 0,
		response: '',
		order: ''
	};

	async componentDidMount() {
		await this.props.fetchSurveys();
		this.setState({
			surveys: this.props.surveys.reverse(),
			recipients: this.calculateRecipients(),
			response: this.calculateLastResponse()
		});
		// this.calculateMetrics();
	}

	componentDidUpdate() {
		if (this.state.surveys !== this.props.surveys)
			this.setState({ surveys: this.props.surveys });
	}

	calculateRecipients() {
		let recipientsTotal = 0;

		if (!this.props.surveys || this.props.surveys === []) {
			return this.props.recipients;
		}

		this.props.surveys.forEach(survey => {
			recipientsTotal += survey.recipients.length;
		});

		return recipientsTotal;
	}

	calculateLastResponse() {
		TimeAgo.addLocale(en);

		const timeAgo = new TimeAgo();
		const lastSurvey = this.props.surveys[0];

		if (lastSurvey) return timeAgo.format(new Date(lastSurvey.dateSent));
	}

	sortSurveyOrder() {
		this.setState({ surveys: this.state.surveys.reverse() });
	}

	handleSelectChange = e => {
		this.setState({ order: e.target.value }, () => this.sortSurveyOrder());
	};

	render() {
		return (
			<Dashboard>
				<HeadingGroup content="Live campaign metrics">
					<SvgWifi styling={typo['heading-svg']}></SvgWifi>
				</HeadingGroup>

				<div className={dash['dashboard__surveys']}>
					<div className={dash['dashboard__campaigns']}>
						<HeadingThird
							type="heading-3--line"
							margin="mb-md"
							content="Campaigns"
						/>

						<form className={dash['dashboard__order']}>
							<label id="order">Order by:</label>
							<select
								onChange={this.handleSelectChange}
								id="order"
							>
								<option value="latest" defaultValue>
									Latest
								</option>
								<option value="earliest">Earliest</option>
							</select>
						</form>

						<SurveyList surveys={this.state.surveys} />
					</div>

					<div className={dash['dashboard__metrics']}>
						<HeadingThird
							type="heading-3--line"
							margin="mb-xlg"
							content="Metrics"
						/>

						<Metrics
							response={this.state.response}
							recipients={this.state.recipients}
						></Metrics>
					</div>
				</div>

				<Link to="/surveys/new" className={dash['form-btn']}>
					<SvgPlusBig />
				</Link>
			</Dashboard>
		);
	}
}

const mapStateToProps = state => {
	return { surveys: state.surveys };
};

export default connect(
	mapStateToProps,
	{ fetchSurveys }
)(requireAuth(Surveys));
