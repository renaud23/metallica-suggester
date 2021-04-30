import React from 'react';
import PropTypes from 'prop-types';
import Suggester from '../suggester';

async function searching() {
	return [];
}

function SuggesterIDB({
	storeName,
	version,
	id,
	className,
	labelledBy,
	optionRenderer,
	labelRenderer,
	onSelect,
	onChange,
	max,
}) {
	return (
		<Suggester
			id={id}
			className={className}
			labelledBy={labelledBy}
			optionRenderer={optionRenderer}
			labelRenderer={labelRenderer}
			onSelect={onSelect}
			onChange={onChange}
			searching={searching}
			max={max}
		/>
	);
}

SuggesterIDB.propTypes = {
	storeName: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	id: PropTypes.string,
	className: PropTypes.string,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	labelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
	max: PropTypes.number,
};

export default SuggesterIDB;
