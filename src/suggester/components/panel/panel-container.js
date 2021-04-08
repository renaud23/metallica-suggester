import React from 'react';
import classnames from 'classnames';

function PanelContainer({ children, focused, id }) {
	return (
		<ul
			id={id}
			tabIndex="-1"
			className={classnames('lunatic-suggester-panel', { focused })}
			role="listbox"
		>
			{children}
		</ul>
	);
}

export default PanelContainer;
