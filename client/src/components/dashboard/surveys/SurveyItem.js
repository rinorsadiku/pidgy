import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { deleteSurvey } from '../../../actions';
import { Doughnut } from 'react-chartjs-2';

import { HeadingThirdDisplay } from './../Typography';
import s from './../css/surveys.module.css';
import typo from '../css/typography.module.css';

class SurveyItem extends React.Component {
	state = {
		chart: {}
	};

	componentDidMount() {
		this.supplyChartData();
	}

	supplyChartData = () => {
		const { yes, no } = this.props.survey;
		const calculateVotes = this.props.survey.recipients.length - (yes + no);

		this.setState({
			chart: {
				labels: ['Yes', 'No', "Haven't voted"],
				datasets: [
					{
						label: 'Responses',
						data: [yes, no, calculateVotes],
						backgroundColor: ['#2E86DE', '#FE656C', '#e3e3e3']
					}
				]
			}
		});
	};

	renderChart() {
		if (!this.props.survey.custom) {
			return (
				<div className={s['surveys__charts']}>
					<Doughnut
						width={150}
						options={{
							maintainAspectRatio: true,
							legend: {
								display: false,
								position: 'bottom'
							}
						}}
						data={this.state.chart}
					></Doughnut>
					<div className={s['surveys__legend']}>
						<div
							className={`${s['surveys__answer']} ${
								s['surveys__answer--yes']
							}`}
						>
							<div
								className={`${s['surveys__circle']} ${
									s['surveys__circle--blue']
								}`}
							></div>
							<span>Yes</span>
						</div>
						<div
							className={`${s['surveys__answer']} ${
								s['surveys__answer--no']
							}`}
						>
							<div
								className={`${s['surveys__circle']} ${
									s['surveys__circle--red']
								}`}
							></div>
							<span>No</span>
						</div>
					</div>
				</div>
			);
		}

		return '';
	}

	renderEnterBtn() {
		if (this.props.survey.custom) {
			return (
				<Link
					to={`/surveys/${this.props.survey._id}`}
					className={`${typo['btn']} ${typo['btn--link']}`}
				>
					Enter
				</Link>
			);
		}

		return '';
	}

	render() {
		const { title, body, _id } = this.props.survey;

		return (
			<div className={s['surveys__item']}>
				<div className={s['surveys__content']}>
					<HeadingThirdDisplay content={title}></HeadingThirdDisplay>
					<p
						className={`${typo['paragraph']} ${
							typo['paragraph--scroll']
						}`}
					>
						{body}
					</p>
					<div className={s['surveys__btn']}>
						<button
							className={`${typo['btn']} ${typo['btn--danger']}`}
							onClick={() => this.props.deleteSurvey(_id)}
						>
							Delete
						</button>
						{this.renderEnterBtn()}
					</div>
				</div>
				{this.renderChart()}
			</div>
		);
	}
}

export default connect(
	null,
	{ deleteSurvey }
)(SurveyItem);
