import React, { useEffect, useState } from 'react';
import { createGetNextPage, storeCog } from './common-tools';
import { StoreTools } from '../store-index';

async function fetchCOG() {
	return fetch('/communes-2019.json').then((response) => response.json());
}

function prepareForIndex(cog) {
	return cog.map(function (commune, i) {
		const { com } = commune;
		return { ...commune, id: `${com}-${i}` };
	});
}

const { name, fields, queryParser } = storeCog;

export function CreateFillStoreCog() {
	const [entities, setEntities] = useState(undefined);

	useEffect(function () {
		async function init() {
			const cog = await fetchCOG();
			setEntities(prepareForIndex(cog));
		}
		init();
	}, []);

	const getNext = createGetNextPage(entities);

	return (
		<StoreTools
			getNext={getNext}
			fields={fields}
			storeName={name}
			queryParser={queryParser}
			version="1"
		/>
	);
}

const story = {
	title: 'store-index/cog',
	component: StoreTools,
};

export default story;
