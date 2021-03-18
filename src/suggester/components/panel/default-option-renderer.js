import React from 'react';

function DefaultOptionRenderer({ option }) {
	const { id } = option;
	return (
		<li role="option" aria-selected={false}>
			{id}
		</li>
	);
}

export default DefaultOptionRenderer;
