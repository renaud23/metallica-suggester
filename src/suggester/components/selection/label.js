import React, { useContext } from 'react';
import { SuggesterContext } from '../../state-management';
import DefaultLabelRenderer from './defaul-label-renderer';

function Label({ labelRenderer: Renderer = DefaultLabelRenderer }) {
	const [state] = useContext(SuggesterContext);
	const { displayLabel, expended, selectedIndex, options, search } = state;
	if (displayLabel || !expended) {
		const option =
			selectedIndex !== undefined ? options[selectedIndex] : undefined;

		return (
			<div className="lunatic-suggester-etiquette">
				<Renderer
					option={option}
					placeholder="placeholder todo..."
					search={search}
				/>
			</div>
		);
	}
	return null;
}

export default Label;
