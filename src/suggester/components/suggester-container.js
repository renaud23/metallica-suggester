import React, { useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { useDocumentAddEventListener } from '../commons-tools';

function SuggesterContainer({
	children,
	className,
	focused,
	onFocus,
	onBlur,
	onKeyDown,
}) {
	const ref = useRef();

	const onClick = useCallback(
		function (e) {
			const { current } = ref;

			if (!current.contains(e.target)) {
				onBlur();
			}
		},
		[ref, onBlur]
	);

	useDocumentAddEventListener('click', onClick);

	return (
		<div
			className={classnames('lunatic-suggester', className, {
				focused,
			})}
			tabIndex="0"
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			ref={ref}
		>
			<div className={classnames('lunatic-suggester-container', { focused })}>
				{children}
			</div>
		</div>
	);
}

export default SuggesterContainer;
