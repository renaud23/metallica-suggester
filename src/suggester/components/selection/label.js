import React, { useContext } from 'react';
import { SuggesterContext } from '../../state-management';
import DefaultLabelRenderer from './defaul-label-renderer';

function Label({
	labelRenderer: Renderer = DefaultLabelRenderer,
	placeholder,
}) {
	const [state] = useContext(SuggesterContext);
	const { displayLabel, expended, selectedIndex, options, search } = state;
	if (displayLabel || !expended) {
		const option =
			selectedIndex !== undefined ? options[selectedIndex] : undefined;

		return (
			<div className="lunatic-suggester-selection">
				<Renderer option={option} placeholder={placeholder} search={search} />
			</div>
		);
	}
	return null;
}

export default Label;
