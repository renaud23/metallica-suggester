import { actions } from '../state-management';
import { BINDED_KEYS } from '../commons-tools';

function create(dispatch) {
	return function (e) {
		const { key } = e;
		switch (key) {
			case BINDED_KEYS.ArrowDow:
			case BINDED_KEYS.ArrowUp:
			case BINDED_KEYS.Home:
			case BINDED_KEYS.End:
			case BINDED_KEYS.Enter:
			case BINDED_KEYS.Escape:
				dispatch(actions.onKeyDown(key));
				break;
			default:
		}
	};
}

export default create;
