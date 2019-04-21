import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../assets/Logo_pidgy_purple.png';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component {
	render() {
		// When we return the StripeCheckout we need to supply some
		// additional props to the component so that we get the desired outcome
		return (
			<StripeCheckout
				image={logo} // Logo to show in the checkout form
				name="Pidgy" // Name to show in the checkout form
				description="$5 for 5 email credits" // Description to show in the checkout form
				amount={500} // amount in cents = $5
				token={token => this.props.handleToken(token)} // MISCONCEPTION: it expects a callback that it runs after it has received the confirmed request token
				stripeKey={process.env.REACT_APP_STRIPE_KEY} // The publishable given by stripe
			>
				{/* Adding a button just for styling purposes */}
				<button className="btn">Add Credits</button>
			</StripeCheckout>
		);
	}
}

export default connect(
	null,
	actions
)(Payments);
