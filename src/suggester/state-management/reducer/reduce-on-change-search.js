function reduce(state, action) {
	const { payload } = action;
	const { search } = payload;

	return { ...state, search };
}

export default reduce;
