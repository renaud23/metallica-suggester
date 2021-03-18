function reduce(state, action) {
	const { payload } = action;
	const { options } = payload;
	return { ...state, options };
}

export default reduce;
