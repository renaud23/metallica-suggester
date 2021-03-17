import * as actions from '../actions';
import reduceOnChangeSearch from './reduce-on-change-search';

function reduce(state, action) {
	const { type } = action;
	switch (type) {
		case actions.ON_CHANGE_SEARCH:
			return reduceOnChangeSearch(state, action);
		default:
			return state;
	}
}

export default reduce;
