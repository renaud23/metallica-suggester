import React, { useEffect } from 'react';
import classnames from 'classnames';
import { openStore } from '../../store-index';
import './suggester.scss';

function SuggesterContainer({ className, storeName, labelledBy }) {
	useEffect(
		function () {
			async function init(name) {
				try {
					const store = await openStore(storeName);
					console.log(store);
				} catch (e) {
					console.log('fail');
				}
			}

			init();
		},
		[storeName]
	);
	return (
		<div className={classnames('lunatic-suggester-container', className)}></div>
	);
}

export default SuggesterContainer;
