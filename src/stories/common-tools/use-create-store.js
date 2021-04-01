import { useEffect, useState } from 'react';
import { createStore } from '../../store-index';

function useCreateStore({ name, version, queryParser }) {
	const [db, setDb] = useState(undefined);
	useEffect(
		function () {
			async function doIt() {
				const _db = await createStore(name, version, queryParser);
				setDb(_db);
			}

			doIt();
		},
		[name, version, queryParser]
	);
	return db;
}

export default useCreateStore;
