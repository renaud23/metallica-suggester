import React, { useContext } from 'react';
import { SuggesterContext } from '../../state-management';
import DefaultLabelRenderer from './defaul-label-renderer';

function Label({ labelRenderer: Renderer = DefaultLabelRenderer }) {
	const [state] = useContext(SuggesterContext);
	const { displayLabel, expended, selectedIndex, options, search } = state;
	if (displayLabel || !expended) {
		if (selectedIndex !== undefined) {
			const option = options[selectedIndex];
			return (
				<div className="lunatic-suggester-etiquette">
					<Renderer option={option} selected={false} search={search} />
				</div>
			);
		}
		return (
			<div className="lunatic-suggester-etiquette">Placehoder todo...</div>
		);
	}
	return null;
}

export default Label;
