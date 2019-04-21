import axios from 'axios';
import { FETCH_USER } from './types';

// Once reduxThunk sees that we are returning a function instead of a normal action
// then it immediately attaches the dispatch() function as an argument to the second function
// When we get a handle of the dispatch function, we can send an action whenever we want
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe/checkout', token);

	dispatch({ type: FETCH_USER, payload: res.data });
};
