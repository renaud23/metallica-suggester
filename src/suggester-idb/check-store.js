import React, { useEffect, useState } from 'react';
import { openDb } from '../commons-idb';

function CheckStore({ storeName, version, children }) {
	const [ready, setReady] = useState(0);
	useEffect(
		function () {
			async function init() {
				try {
					const store = await openDb(storeName, version);
					if (store) {
						setReady(200);
					}
				} catch (e) {
					setReady(400);
				}
			}

			init();
		},
		[storeName, version]
	);
	if (ready === 0) {
		return (
			<div className="lunatic-suggester-in-progress">
				Le store {storeName} est en cour de chargement.
			</div>
		);
	}
	if (ready === 200) {
		return children;
	}
	return (
		<div className="lunatic-suggester-unvailable">
			Le store {storeName} n'est pas disponible.
		</div>
	);
}

export default CheckStore;
