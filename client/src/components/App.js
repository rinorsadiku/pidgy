// Here we will add all of our routing logic and also place some components that persist through out the app like the header component
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';

import Error from './dashboard/404';
import Drafts from './dashboard/drafts/Drafts';
import Landing from './landing/Landing';
import Surveys from './dashboard/surveys/Surveys';
import SurveyNew from './dashboard/surveys/SurveyNew';
import Results from './dashboard/results/Results';
import Submit from './dashboard/submit/Submit';
import Thanks from './dashboard/Thanks';

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<>
				{/* Browser only expects to get AT MOST ONE NESTED CHILD */}
				<BrowserRouter>
					<Switch>
						{/* For as long as a component is not a Route, 
						then we can freely but different components that will always be visible */}
						<Route path="/404" exact component={Error} />
						<Route path="/thanks" exact component={Thanks} />
						<Route path="/drafts" exact component={Drafts} />
						<Route path="/surveys" exact component={Surveys} />
						<Route
							path="/surveys/new"
							exact
							component={SurveyNew}
						></Route>
						<Route
							path="/surveys/:surveyId"
							exact
							component={Results}
						/>
						<Route
							path="/surveys/:surveyId/:email"
							exact
							component={Submit}
						/>
						<Route path="/" exact component={Landing} />
					</Switch>
				</BrowserRouter>
			</>
		);
	}
}

export default connect(
	null,
	actions
)(App);
