import React, { useCallback, useContext, useRef } from 'react';
import { actions, SuggesterContext } from '../state-management';
import SuggesterContainer from './suggester-container';
import Selection from './selection';
import Panel from './panel';
import createOnKeyDownCallback from './create-on-keydown-callback';
import './suggester.scss';

function Suggester({
	className,
	placeholder,
	labelledBy,
	optionRenderer,
	labelRenderer,
}) {
	const inputRef = useRef();
	const [state, dispatch] = useContext(SuggesterContext);
	const { focused, id } = state;

	const onFocus = useCallback(
		function () {
			dispatch(actions.onFocus());
		},
		[dispatch]
	);

	const onBlur = useCallback(
		function () {
			if (focused) {
				dispatch(actions.onBlur());
			}
		},
		[dispatch, focused]
	);

	const onKeyDown = createOnKeyDownCallback(dispatch);
	return (
		<SuggesterContainer
			id={id}
			className={className}
			focused={focused}
			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={onKeyDown}
		>
			<Selection
				ref={inputRef}
				labelRenderer={labelRenderer}
				placeholder={placeholder}
			/>
			<Panel optionRenderer={optionRenderer} />
		</SuggesterContainer>
	);
}

export default Suggester;
