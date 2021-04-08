import React from 'react';
import PropTypes from 'prop-types';

function DefaultLabelRenderer({ option, placeholder, search }) {
	if (option) {
		const { id } = option;
		return (
			<div className="lunatic-suggester-default-etiquette-renderer">
				<span className="search">{id}</span>
			</div>
		);
	}
	return <span className="placeholder">{placeholder}</span>;
}

DefaultLabelRenderer.propTypes = {
	option: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}),
	placeholder: PropTypes.string,
	search: PropTypes.string,
};

export default DefaultLabelRenderer;
