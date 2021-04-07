import { useEffect, useState } from 'react';
import { createStore } from '../../store-index';

function useCreateStore(store) {
	const [db, setDb] = useState(undefined);
	useEffect(
		function () {
			async function doIt() {
				const _db = await createStore(store, '1');
				setDb(_db);
			}

			doIt();
		},
		[store]
	);
	return db;
}

export default useCreateStore;
