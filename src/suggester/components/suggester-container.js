import React from 'react';
import classnames from 'classnames';

function SuggesterContainer(
	{ children, className, focused, onFocus, onBlur, onKeyDown },
	ref
) {
	return (
		<div
			className={classnames('lunatic-suggester', className, {
				focused,
			})}
			tabIndex="0"
			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={onKeyDown}
		>
			<div className={classnames('lunatic-suggester-container', { focused })}>
				{children}
			</div>
		</div>
	);
}

export default SuggesterContainer;
