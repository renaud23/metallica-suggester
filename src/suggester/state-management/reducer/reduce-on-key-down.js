import { BINDED_KEYS } from '../../commons-tools';

function reduceArrowDown(state) {
	const { options, selectedIndex: prec } = state;
	const selectedIndex = Math.min((prec || 0) + 1, options.length - 1);
	return { ...state, selectedIndex };
}

function reduceArrowUp(state) {
	const { selectedIndex: prec } = state;
	const selectedIndex = Math.max((prec || 0) - 1, 0);
	return { ...state, selectedIndex };
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
