// Here we will create and export the combineReducer
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

// The names that you give the keys in combineReducers are the names that you will refere to in the state
export default combineReducers({
	auth: authReducer,
	form: reduxForm, // redux-form reducer
	surveys: surveysReducer
});
