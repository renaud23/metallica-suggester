import React, { useCallback, useContext } from 'react';
import { actions, SuggesterContext } from '../state-management';
import SuggesterContainer from './suggester-container';
import CheckStore from './check-store';
import Selection from './selection';
import Panel from './panel';
import createOnKeyDownCallback from './create-on-keydown-callback';
import './suggester.scss';

function Suggester({
	className,
	storeName,
	version,
	labelledBy,
	optionRenderer,
}) {
	const [state, dispatch] = useContext(SuggesterContext);
	const { focused } = state;
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
		<CheckStore storeName={storeName} version={version}>
			<SuggesterContainer
				className={className}
				focused={focused}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
				storeName={storeName}
			>
				<Selection />
				<Panel optionRenderer={optionRenderer} />
			</SuggesterContainer>
		</CheckStore>
	);
}

export default Suggester;
