import React, { useContext } from 'react';
import { SuggesterContext } from '../../state-management';

function Panel({ optionRenderer: OptionRender }) {
	const [state] = useContext(SuggesterContext);
	const { options, focused } = state;
	const content = options.map(function (option) {
		const { id } = option;
		return <OptionRender key={id} option={option} />;
	});
	if (focused) {
		return (
			<div className="lunatic-suggester-panel" role="listbox">
				{content}
			</div>
		);
	}
	return null;
}

export default Panel;
