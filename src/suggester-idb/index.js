import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Suggester from '../suggester';
import { searching } from '../searching';
import CheckStore from './check-store';

function createSearching(storeName, version, language) {
	return async function (search) {
		return searching(search, storeName, version, language);
	};
}

function SuggesterIDB({
	storeName,
	version,
	className,
	labelledBy,
	optionRenderer,
	labelRenderer,
	onSelect,
	onChange,
}) {
	const [store, setStore] = useState(undefined);
	const cally = useMemo(
		function () {
			if (store) {
				return createSearching(storeName, version);
			}
			return () => [];
		},
		[storeName, version, store]
	);

	return (
		<CheckStore storeName={storeName} version={version} setStore={setStore}>
			<Suggester
				className={className}
				labelledBy={labelledBy}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				onSelect={onSelect}
				onChange={onChange}
				searching={cally}
			/>
		</CheckStore>
	);
}

SuggesterIDB.propTypes = {
	storeName: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	className: PropTypes.string,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	labelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
};

export default SuggesterIDB;
