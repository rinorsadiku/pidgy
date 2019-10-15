import React from 'react';
import map from 'lodash/map';

import { drafts__list } from '../css/drafts.module.css';
import DraftsItem from './DraftsItem';

const DraftsList = props => {
	const renderDrafts = map(props.drafts, draft => {
		if (draft === {}) return;
		return <DraftsItem key={draft._id} draft={draft}></DraftsItem>;
	});

	return <div className={drafts__list}>{renderDrafts}</div>;
};

export default DraftsList;
