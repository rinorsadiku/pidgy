import React from 'react';

import MetricsItem from './MetricsItem';
import m from '../css/metrics.module.css';

class Metrics extends React.Component {
	render() {
		return (
			<div className={m['metrics']}>
				<MetricsItem
					title="Surveys Sent"
					data={this.props.recipients}></MetricsItem>
				<MetricsItem
					title="Last Response"
					data={this.props.response}></MetricsItem>
			</div>
		);
	}
}

export default Metrics;
