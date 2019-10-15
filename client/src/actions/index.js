import axios from 'axios';
import {
	FETCH_USER,
	FETCH_SURVEYS,
	FETCH_DATA,
	SUBMIT_DATA,
	DELETE_SURVEY,
	FETCH_DRAFTS,
	FETCH_DRAFT,
	DELETE_DRAFT,
	UPDATE_DRAFT
} from './types';

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

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	// Redirecting the user after form submission
	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchSurvey = id => async dispatch => {
	const res = await axios.get(`/api/surveys/${id}`);

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const deleteSurvey = id => async dispatch => {
	await axios.delete(`/api/surveys/${id}`);

	dispatch({ type: DELETE_SURVEY, payload: id });
};

export const submitData = (values, history) => async dispatch => {
	const res = await axios.post('/api/data', values);

	history.push('/thanks');
	console.log(res.data);
	dispatch({ type: SUBMIT_DATA, payload: res.data });
};

export const fetchData = surveyId => async dispatch => {
	const res = await axios.get(`/api/data/${surveyId}`);

	dispatch({ type: FETCH_DATA, payload: res.data });
};

export const submitDraft = values => async dispatch => {
	const res = await axios.post('/api/drafts', values);

	dispatch({ type: FETCH_DRAFTS, payload: res.data });
};

export const fetchDrafts = () => async dispatch => {
	const res = await axios.get('/api/drafts');

	dispatch({ type: FETCH_DRAFTS, payload: res.data });
};

export const fetchDraft = id => async dispatch => {
	const res = await axios.get(`/api/drafts/${id}`);

	dispatch({ type: FETCH_DRAFT, payload: res.data });
};

export const deleteDraft = id => async dispatch => {
	await axios.delete(`/api/drafts/${id}`);

	dispatch({ type: DELETE_DRAFT, payload: id });
};

export const updateDraft = (id, values) => async dispatch => {
	const res = await axios.put(`/api/drafts/${id}`, values);

	dispatch({ type: UPDATE_DRAFT, payload: res.data });
};
