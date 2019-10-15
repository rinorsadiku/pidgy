import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDraft } from '../../../actions';

import { HeadingThirdDisplay } from './../Typography';

import d from '../css/drafts.module.css';
import typo from '../css/typography.module.css';
import DraftsRecipients from './DraftsRecipients';

class DraftsItem extends React.Component {
	render() {
		return (
			<div className={d['drafts__item']}>
				<div className={d['drafts__content']}>
					<HeadingThirdDisplay content={this.props.draft.title} />
					<p
						className={`${typo['paragraph']} ${
							typo['paragraph--scroll']
						}`}
					>
						{this.props.draft.body}
					</p>
					<div className={d['drafts__btn-group']}>
						<button
							className={`${typo['btn']} ${typo['btn--danger']} ${
								d['drafts__btn']
							}`}
							onClick={() =>
								this.props.deleteDraft(this.props.draft._id)
							}
						>
							Delete
						</button>
						<Link
							to={`/surveys/new?draft=true&id=${this.props.draft._id}`}
							className={`${typo['btn']} ${typo['btn--link']}`}
						>
							Continue
						</Link>
					</div>
				</div>

				<DraftsRecipients recipients={this.props.draft.recipients} />
			</div>
		);
	}
}

export default connect(
	null,
	{ deleteDraft }
)(DraftsItem);
