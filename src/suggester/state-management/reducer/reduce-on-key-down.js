import { BINDED_KEYS } from '../../commons-tools';

function reduceArrowDown(state) {
	return state;
}

function reduceArrowUp(state) {
	return state;
}

function reduce(state, action) {
	const { payload } = action;
	const { key } = payload;
	switch (key) {
		case BINDED_KEYS.ArrowDown:
			return reduceArrowDown(state);
		case BINDED_KEYS.ArrowUp:
			return reduceArrowUp(state);
		default:
			return state;
	}
}

export default reduce;
