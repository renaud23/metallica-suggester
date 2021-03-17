import React, { useReducer, useEffect } from 'react';
import { reducer, INITIAL_STATE, SuggesterContext } from './state-management';
import { Suggester } from './components';
import { searching } from '../searching';
import { string } from 'prop-types';
import { DomainTwoTone } from '@material-ui/icons';

function isValideSearch(search) {
	if (typeof search === 'string' && search.trim().length) {
		return true;
	}
	return false;
}

function LunaticSuggester({ className, storeName, version, labelledBy }) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { search } = state;

	useEffect(
		function () {
			async function doIt() {
				const results = await searching(search, storeName, version);
				console.log(results);
			}
			if (isValideSearch(search)) {
				doIt();
			} else {
				// TODO
			}
		},
		[search, storeName, version]
	);
	return (
		<SuggesterContext.Provider value={[state, dispatch]}>
			<Suggester
				className={className}
				storeName={storeName}
				version={version}
				labelledBy={labelledBy}
			/>
		</SuggesterContext.Provider>
	);
}

export default LunaticSuggester;
