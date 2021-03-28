import React from 'react';

function OptionCogRenderer({ option, active, index }) {
	const { libelle, com } = option;
	return (
		<div className="cog-option">
			<span className="code">{com}</span>
			<span className="libelle">{libelle}</span>
		</div>
	);
}

export default OptionCogRenderer;
