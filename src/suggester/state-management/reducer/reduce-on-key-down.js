import { BINDED_KEYS } from '../../commons-tools';

function reduceArrowDown(state) {
	const { options, selectedIndex: prec } = state;
	if (options.length) {
		const selectedIndex = Math.min(prec + 1 || 0, options.length - 1);
		return { ...state, selectedIndex };
	}
	return state;
}

function reduceArrowUp(state, options) {
	const { selectedIndex: prec } = state;
	if (options.length) {
		const selectedIndex = Math.max(prec - 1 || 0, 0);
		return { ...state, selectedIndex };
	}
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
