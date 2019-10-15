import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/logo-rel.png';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Payments extends React.Component {
	render() {
		// When we return the StripeCheckout we need to supply some
		// additional props to the component so that we get the desired outcome
		return (
			<StripeCheckout
				image={logo} // Logo to show in the checkout form
				name="Pidgy" // Name to show in the checkout form
				description="Purchase 5 Mail Credits" // Description to show in the checkout form
				amount={500} // amount in cents = $5
				token={token => this.props.handleToken(token)} // MISCONCEPTION: it expects a callback that it runs after it has received the confirmed request token
				stripeKey={process.env.REACT_APP_STRIPE_KEY} // The publishable key given by stripe
			>
				{/* Adding a button just for styling purposes */}
				<button className={this.props.btn}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14.765"
						height="14.764"
						viewBox="0 0 14.765 14.764">
						<g
							id="Group_118"
							dataname="Group 118"
							transform="translate(-1592.792 -157.221)">
							<path
								id="Path_291"
								dataname="Path 291"
								d="M3659.174,225.732V240.5"
								transform="translate(-2058.938 -68.511)"
								fill="none"
								stroke="#f7f8f9"
								strokeWidth="1.2"
							/>
							<path
								id="Path_292"
								dataname="Path 292"
								d="M3650.3,232.525h14.765"
								transform="translate(-2057.503 -67.923)"
								fill="none"
								stroke="#f7f8f9"
								strokeWidth="1.2"
							/>
						</g>
					</svg>
					Add Credits
				</button>
			</StripeCheckout>
		);
	}
}

export default connect(
	null,
	actions
)(Payments);
