import React from 'react';
import classnames from 'classnames';
import CheckStore from './check-store';
import Selection from './selection';
import './suggester.scss';

function SuggesterContainer({ children, className }) {
	return (
		<div className={classnames('lunatic-suggester-container', className)}>
			{children}
		</div>
	);
}

function Suggester({ className, storeName, version, labelledBy }) {
	return (
		<CheckStore storeName={storeName} version={version}>
			<SuggesterContainer className={className}>
				<Selection />
			</SuggesterContainer>
		</CheckStore>
	);
}

export default Suggester;
