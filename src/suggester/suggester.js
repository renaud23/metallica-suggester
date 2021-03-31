import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	reducer,
	INITIAL_STATE,
	SuggesterContext,
	actions,
} from './state-management';
import { Suggester } from './components';
import { searching } from '../searching';
import { DefaultOptionRenderer } from './components';

function isValideSearch(search) {
	if (typeof search === 'string' && search.trim().length) {
		return true;
	}
	return false;
}

function LunaticSuggester({
	className,
	storeName,
	version,
	labelledBy,
	optionRenderer,
	language,
	onSelect,
	onChange,
}) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { search } = state;

	useEffect(
		function () {
			async function doIt() {
				const results = await searching(search, storeName, version, language);
				dispatch(actions.onUpdateOptions(results));
				onChange(results, search);
			}
			if (isValideSearch(search)) {
				doIt();
			} else {
				dispatch(actions.onUpdateOptions([]));
				onChange([], search);
			}
		},
		[search, storeName, version, language, onChange]
	);
	return (
		<SuggesterContext.Provider value={[state, dispatch]}>
			<Suggester
				className={className}
				storeName={storeName}
				version={version}
				labelledBy={labelledBy}
				optionRenderer={optionRenderer}
			/>
		</SuggesterContext.Provider>
	);
}

LunaticSuggester.propTypes = {
	className: PropTypes.string,
	storeName: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	language: PropTypes.string,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
};

LunaticSuggester.defaultProps = {
	className: undefined,
	labelledBy: undefined,
	optionRenderer: DefaultOptionRenderer,
	language: 'French',
	onSelect: () => null,
	onChange: () => null,
};

export default LunaticSuggester;
