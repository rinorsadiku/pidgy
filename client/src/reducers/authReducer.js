import { FETCH_USER } from './../actions/types';

// Reducer that takes care of the authentication state
export default (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			// If the string is a falsy value, then just return false
			return action.payload || false; // if the string is '' then return false

		default:
			return state;
	}
};
