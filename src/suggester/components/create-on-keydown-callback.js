export const BINDED_KEY = {
	ArrowUp: 'ArrowUp',
	ArrowDown: 'ArrowDown',
	Home: 'Home',
	End: 'End',
	Enter: 'Enter',
	Escape: 'Escape',
};

function create(dispatch) {
	return function (e) {
		const { key } = e;
		switch (key) {
			case BINDED_KEY.ArrowDow:
			case BINDED_KEY.ArrowUp:
			default:
		}
	};
}

export default create;
