import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Suggester from '../suggester';
import { searching } from '../searching';
import CheckStore from './check-store';

// <CheckStore storeName={storeName} version={version}>

// const results = await searching(search, storeName, version, language);

function createSearching(storeName, version, language) {
	return async function (search) {
		return searching(search, storeName, version, language);
	};
}

function SuggesterIDB({
	className,
	storeName,
	version,
	labelledBy,
	optionRenderer,
	language,
	onSelect,
	onChange,
}) {
	const cally = useMemo(() => createSearching(storeName, version, language), [
		storeName,
		version,
		language,
	]);
	return (
		<CheckStore storeName={storeName} version={version}>
			<Suggester
				className={className}
				labelledBy={labelledBy}
				optionRenderer={optionRenderer}
				onSelect={onSelect}
				onChange={onChange}
				searching={cally}
			/>
		</CheckStore>
	);
}

SuggesterIDB.propTypes = {
	className: PropTypes.string,
	storeName: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	language: PropTypes.string,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
};

export default SuggesterIDB;
