import React, { useContext } from 'react';
import { SuggesterContext, actions } from '../../state-management';
import Label from './label';

function Selection(_, ref) {
	const [state, dispatch] = useContext(SuggesterContext);
	const { search } = state;

	function onChange(e) {
		dispatch(actions.onChangeSearch(e.target.value));
	}

	return (
		<div className="lunatic-suggester-selection">
			<input
				tabIndex="0"
				className="lunatic-suggester-input"
				type="search"
				onChange={onChange}
				value={search}
				ref={ref}
				placeholder="Veuillez..."
			/>
			<Label />
		</div>
	);
}

export default React.forwardRef(Selection);
