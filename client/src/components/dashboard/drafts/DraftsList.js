import React from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

import { drafts__list } from '../css/drafts.module.css';
import DraftsItem from './DraftsItem';

const DraftsList = props => {
	if (isEmpty(props.drafts)) return <p>There are no drafts to show</p>;

	const renderDrafts = map(props.drafts, draft => {
		if (isEmpty(draft)) return '';
		return <DraftsItem key={draft._id} draft={draft}></DraftsItem>;
	});

	return <div className={drafts__list}>{renderDrafts}</div>;
};

export default DraftsList;
