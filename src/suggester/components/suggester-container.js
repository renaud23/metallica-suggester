import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';

function SuggesterContainer({
	children,
	className,
	focused,
	onFocus,
	onBlur,
	onKeyDown,
}) {
	const ref = useRef();

	useEffect(
		function () {
			const { current } = ref;
			function onMouseDown(e) {
				if (!current.contains(e.target)) {
					onBlur();
				}
			}
			document.addEventListener('mousedown', onMouseDown);
			return function () {
				document.removeEventListener('mousedown', onMouseDown);
			};
		},
		[onBlur, ref]
	);

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
