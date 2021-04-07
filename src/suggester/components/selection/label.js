import React, { useContext } from 'react';
import { SuggesterContext } from '../../state-management';

function Label() {
	const [state] = useContext(SuggesterContext);
	const { displayLabel, selectedIndex } = state;
	if (displayLabel) {
		return <div className="lunatic-suggester-etiquette">Label</div>;
	}
	return null;
}

export default Label;
