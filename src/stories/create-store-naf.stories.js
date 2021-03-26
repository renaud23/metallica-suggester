import React, { useEffect, useState } from 'react';
import { createGetNextPage, storeNaf } from './common-tools';
import { StoreTools } from '../store-index';

const { name, fields, queryParser } = storeNaf;

async function fetchNaf() {
	return fetch('/naf-rev2.json').then((response) => response.json());
}

function prepareForIndex(naf) {
	return Object.values(naf).map(function (rubrique) {
		const { code } = rubrique;
		return { ...rubrique, id: code };
	});
}

export function CreateFillStoreNaf() {
	const [entities, setEntities] = useState(undefined);
	useEffect(function () {
		async function init() {
			const naf = await fetchNaf();
			setEntities(prepareForIndex(naf));
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
	title: 'store-index/naf',
	component: StoreTools,
};

export default story;
