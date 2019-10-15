// This is the main root of our client side
// Here we will take care of the data layer which means wiring
// react with redux and also rendering the app component in the DOM
// Also we will require in the CSS here so that we can load all the styling
// in other components... it doesn't really matter where you put it,
// for as long as you can reference it inside the jsx code
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
