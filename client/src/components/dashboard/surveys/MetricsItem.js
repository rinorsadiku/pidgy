import React from 'react';

import { metrics__data, metrics__item } from '../css/metrics.module.css';
import { HeadingFourth } from '../Typography';

const MetricsItem = props => {
	return (
		<div className={metrics__item}>
			<HeadingFourth content={props.title}></HeadingFourth>

			<span className={metrics__data}>{props.data}</span>
		</div>
	);
};

export default MetricsItem;
