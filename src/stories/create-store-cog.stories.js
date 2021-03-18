import React, { useEffect, useState } from 'react';
import { StoreTools } from '../store-index';

//nccenr libelle
const FIELDS = [
	{ name: 'libelle' },
	// { name: 'libelle', rules: [/[\w]+/], language: 'French', min: 3 },
	// { name: 'nccenr', rules: [/[\w]+/], language: 'French', min: 3 },
	{ name: 'com' },
];
const STORE_NAME = 'cog';

async function fetchCOG() {
	return fetch('/communes-2019.json').then((response) => response.json());
}

function prepareForIndex(cog) {
	return cog.map(function (commune) {
		const { com } = commune;
		return { ...commune, id: com };
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
