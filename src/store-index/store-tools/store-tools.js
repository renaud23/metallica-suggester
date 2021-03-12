import React, { useEffect, useState, useCallback } from 'react';
import { fillStore } from '../create-store';
import Fab from '@material-ui/core/Fab';
import Loop from '@material-ui/icons/Loop';

async function createStore(storeName, fields, entities) {
	await fillStore(storeName, fields, entities);
}

function StoreTools({ entities, storeName, fields }) {
	const [disabled, setDisabled] = useState(true);

	useEffect(
		function () {
			if (entities && storeName && fields) {
				setDisabled(false);
			}
		},
		[entities, storeName, fields]
	);

	const follow = useCallback(function (args) {
		console.log(args);
	}, []);

	const load = useCallback(
		function () {
			async function go() {
				setDisabled(true);
				await createStore(storeName, fields, entities, follow);
				setDisabled(false);
			}
			go();
		},
		[storeName, fields, entities, follow]
	);

	return (
		<div className="store-tools">
			<Fab disabled={disabled} color="primary" aria-label="add" onClick={load}>
				<Loop />
			</Fab>
		</div>
	);
}

export default StoreTools;
