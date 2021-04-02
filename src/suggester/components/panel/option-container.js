import React, { useContext } from 'react';
import classnames from 'classnames';
import { actions, SuggesterContext } from '../../state-management';

function OptionContainer({ children, index }) {
	const [state, dispatch] = useContext(SuggesterContext);
	const { selectedIndex } = state;
	const selected = index === selectedIndex;

	function onClick(e) {
		e.stopPropagation();
		e.preventDefault();
		dispatch(actions.onClickOption(index));
	}

	return (
		<li
			className={classnames('lunatic-suggester-option', { selected })}
			role="option"
			aria-selected={selected}
			onClick={onClick}
		>
			{children}
		</li>
	);
}

export default OptionContainer;
