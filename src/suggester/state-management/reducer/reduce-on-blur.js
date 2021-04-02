function reduce(state) {
	return { ...state, focused: false, expended: false };
}

export default reduce;
