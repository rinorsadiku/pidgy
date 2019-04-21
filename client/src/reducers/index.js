// Here we will create and export the combineReducer
import { combineReducers } from 'redux';
import authReducer from './authReducer';

// The names that you give the keys in combineReducers are the names that you will refere to in the state
export default combineReducers({
	auth: authReducer
});
