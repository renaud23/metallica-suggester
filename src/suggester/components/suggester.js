import React, { useCallback, useContext } from 'react';
import classnames from 'classnames';
import { actions, SuggesterContext } from '../state-management';
import CheckStore from './check-store';
import Selection from './selection';
import Panel from './panel';
import './suggester.scss';

function SuggesterContainer({ children, className, focused, onFocus, onBlur }) {
	return (
		<div
			className={classnames('lunatic-suggester', className, {
				focused,
			})}
			tabIndex="0"
			onFocus={onFocus}
			onBlur={onBlur}
		>
			<div className={classnames('lunatic-suggester-container', { focused })}>
				{children}
			</div>
		</div>
	);
}

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
			dispatch(actions.onBlur());
		},
		[dispatch]
	);
	return (
		<CheckStore storeName={storeName} version={version}>
			<SuggesterContainer
				className={className}
				focused={focused}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				<Selection />
				<Panel optionRenderer={optionRenderer} />
			</SuggesterContainer>
		</CheckStore>
	);
}

export default Suggester;
