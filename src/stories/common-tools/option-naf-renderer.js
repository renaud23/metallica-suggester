import React from 'react';
import classnames from 'classnames';

function OptionNafRenderer({ option, active, index }) {
	const { libelle, code, niveau } = option;
	return (
		<div className="naf-option">
			<span className={classnames('code', niveau)} title={`${niveau} ${code}`}>
				{code}
			</span>
			<span className="libelle">{libelle}</span>
		</div>
	);
}

export default OptionNafRenderer;
