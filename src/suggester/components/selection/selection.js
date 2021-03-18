import React, { useContext } from 'react';
import { SuggesterContext, actions } from '../../state-management';

function Selection() {
	const [state, dispatch] = useContext(SuggesterContext);
	const { search } = state;

	function onChange(e) {
		dispatch(actions.onChangeSearch(e.target.value));
	}

	return (
		<div className="lunatic-suggester-selection">
			<input
				className="lunatic-suggester-input"
				type="text"
				onChange={onChange}
				value={search}
			/>
		</div>
	);
}

export default Selection;
