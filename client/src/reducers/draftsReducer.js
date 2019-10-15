import mapKeys from 'lodash/mapKeys';
import omit from 'lodash/omit';
import {
	FETCH_DRAFTS,
	FETCH_DRAFT,
	DELETE_DRAFT,
	UPDATE_DRAFT
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_DRAFTS:
			return { ...state, ...mapKeys(action.payload, '_id') };
		case FETCH_DRAFT:
			return { ...state, [action.payload._id]: action.payload };
		case UPDATE_DRAFT:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_DRAFT:
			return omit(state, action.payload);
		default:
			return state;
	}
};
