// Here we will add all of our routing logic and also place some components that persist through out the app like the header component
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				{/* Browser only expects to get AT MOST ONE NESTED CHILD */}
				<BrowserRouter>
					<div>
						{/* For as long as a component is not a Route, 
						then we can freely but different components that will always be visible */}
						<Header />
						<Route path="/" exact component={Landing} />
						<Route path="/surveys" exact component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(
	null,
	actions
)(App);
