import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './../../actions/index';
import { withRouter } from 'react-router-dom';

export default ChildComponent => {
	class ComposedComponent extends React.Component {
		componentDidMount() {
			this.navigateOnAuth();
		}

		componentDidUpdate() {
			this.navigateOnAuth();
		}

		navigateOnAuth = async () => {
			if (!this.props.auth) {
				await this.props.fetchUser();
				if (!this.props.auth) this.props.history.push('/');
			}
		};

		render() {
			return <ChildComponent {...this.props} />;
		}
	}

	const mapStateToProps = ({ auth }) => {
		return { auth };
	};

	return connect(
		mapStateToProps,
		{ fetchUser }
	)(withRouter(ComposedComponent));
};
