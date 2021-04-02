function reduce(state) {
	return { ...state, focused: true, expended: true };
}

export default reduce;
