import React, { useEffect, useState } from 'react';
import { StoreTools } from '../store-index';

const NAF_FIELDS = [
	{ name: 'libelle', rules: [/[\w]+/], language: 'French', min: 3 },
	{ name: 'code' },
];
const STORE_NAME = 'naf-rev2';

async function fetchNaf() {
	return fetch('/naf-rev2.json').then((response) => response.json());
}

export function CreateFillStore() {
	const [entities, setEntities] = useState(undefined);
	useEffect(function () {
		async function init() {
			const naf = await fetchNaf();
			setEntities(Object.values(naf));
		}
		init();
	}, []);

	return (
		<>
			<StoreTools
				entities={entities}
				fields={NAF_FIELDS}
				storeName={STORE_NAME}
			/>
		</>
	);
}

const story = {
	title: 'store-index/StoreTools',
	component: StoreTools,
};

export default story;
