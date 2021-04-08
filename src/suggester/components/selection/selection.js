import React, { useContext } from 'react';
import { SuggesterContext, actions } from '../../state-management';
import Label from './label';

function Selection({ labelRenderer }, ref) {
	const [state, dispatch] = useContext(SuggesterContext);
	const { search, expended, id } = state;

	function onChange(e) {
		dispatch(actions.onChangeSearch(e.target.value));
	}

	return (
		<div className="lunatic-suggester-selection">
			<input
				id={`${id}-input`}
				tabIndex="0"
				className="lunatic-suggester-input"
				type="text"
				onChange={onChange}
				value={search}
				ref={ref}
				role="combobox"
				aria-expanded={expended}
				aria-autocomplete="list"
				aria-controls={`${id}-list`}
				autoComplete="off"
				autoCapitalize="off"
				autoCorrect="off"
				spellCheck="false"
				placeholder="Veuillez..."
			/>
			<Label labelRenderer={labelRenderer} />
		</div>
	);
}

export default React.forwardRef(Selection);
