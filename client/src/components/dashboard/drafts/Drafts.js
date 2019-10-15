import React from 'react';
import Dashboard from '../Dashboard';
import DraftsList from './DraftsList';

import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import { fetchDrafts } from '../../../actions';

import { HeadingGroup, HeadingThird } from './../Typography';
import { SvgDrafts } from '../Svg';

import { drafts__main } from '../css/drafts.module.css';
import typo from '../css/typography.module.css';

class Drafts extends React.Component {
	componentDidMount = async () => {
		await this.props.fetchDrafts();
	}

	render() {
		return (
			<Dashboard>
				<HeadingGroup content="Saved Drafts">
					<SvgDrafts styling={typo['heading-svg']} />
				</HeadingGroup>

				<div className={drafts__main}>
					<HeadingThird
						type="heading-3--line"
						margin="mb-md"
						content="Drafts"
					/>

					<DraftsList drafts={this.props.drafts}></DraftsList>
				</div>
			</Dashboard>
		);
	}
}

const mapStateToProps = ({ drafts }) => {
	return { drafts };
};

export default connect(
	mapStateToProps,
	{ fetchDrafts }
)(requireAuth(Drafts));
