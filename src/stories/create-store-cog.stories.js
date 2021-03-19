import React, { useEffect, useState } from 'react';
import { StoreTools } from '../store-index';

//nccenr libelle
const FIELDS = [
	{ name: 'libelle', rules: 'soft' },
	{ name: 'nccenr', rules: 'soft' },
	{ name: 'com', rules: 'soft' },
];
const STORE_NAME = 'cog';

async function fetchCOG() {
	return fetch('/communes-2019.json').then((response) => response.json());
}

function prepareForIndex(cog) {
	return cog.map(function (commune, i) {
		const { com } = commune;
		return { ...commune, id: `${com}-${i}` };
	});
}

export function CreateFillStore() {
	const [entities, setEntities] = useState(undefined);
	useEffect(function () {
		async function init() {
			const cog = await fetchCOG();
			setEntities(prepareForIndex(cog));
		}
		init();
	}, []);

	return (
		<>
			<StoreTools entities={entities} fields={FIELDS} storeName={STORE_NAME} />
		</>
	);
}

const story = {
	title: 'store-index/cog',
	component: StoreTools,
};

export default story;
