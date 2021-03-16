import React, { useReducer } from 'react';
import { reducer, INITIAL_STATE, SuggesterContext } from './state-management';
import { SuggesterContainer } from './components';

function Suggester({ className, storeName, labelledBy }) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	return (
		<SuggesterContext.Provider value={[state, dispatch]}>
			<SuggesterContainer
				className={className}
				storeName={storeName}
				labelledBy={labelledBy}
			/>
		</SuggesterContext.Provider>
	);
}

export default Suggester;
