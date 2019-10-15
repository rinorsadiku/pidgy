import React from 'react';
import map from 'lodash/map';
import {
	drafts__recipients,
	drafts__recipient
} from '../css/drafts.module.css';

const DraftsRecipients = props => {
	const renderRecipients = map(props.recipients, (recipient, index) => {
		return (
			<li key={`${recipient}-${index}`} className={drafts__recipient}>
				{recipient}
			</li>
		);
	});

	return <ul className={drafts__recipients}>{renderRecipients}</ul>;
};

export default DraftsRecipients;
