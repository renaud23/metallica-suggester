import React from 'react';
import PropTypes from 'prop-types';

function DefaultLabelRenderer({ option, search }) {
	const { id } = option;
	return (
		<div className="lunatic-suggester-default-etiquette-renderer">
			<span className="search">{search}</span>
			<span className="id">{id}</span>
		</div>
	);
}

DefaultLabelRenderer.propTypes = {
	option: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}),
	search: PropTypes.string,
};

export default DefaultLabelRenderer;
