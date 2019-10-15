import { FETCH_DATA, SUBMIT_DATA } from '../actions/types';

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_DATA:
			return action.payload;
		case SUBMIT_DATA:
			return [...state, action.payload];
		default:
			return state;
	}
};
