import React from 'react';
import classnames from 'classnames';

function PanelContainer({ children, focused }) {
	return (
		<ul
			tabIndex="-1"
			className={classnames('lunatic-suggester-panel', { focused })}
			role="listbox"
		>
			{children}
		</ul>
	);
}

export default PanelContainer;
