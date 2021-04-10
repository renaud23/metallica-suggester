import { useEffect, useState } from 'react';
import createStore from '../create';

function useStoreIndex(store, idbVersion) {
	const [db, setDb] = useState(undefined);

	useEffect(
		function () {
			async function init() {
				if (store && idbVersion) {
					const db = await createStore(store, idbVersion);
					setDb(db);
				}
			}

			init();
		},
		[store, idbVersion]
	);
	return db;
}

export default useStoreIndex;
