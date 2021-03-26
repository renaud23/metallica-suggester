import React, { useEffect, useState } from 'react';
import { createGetNextPage } from './common-tools';
import { StoreTools } from '../store-index';

const FIELDS = [
	{ name: 'libelle', rules: [/[\w]+/], language: 'French', min: 3 },
	{ name: 'code' },
];
const STORE_NAME = 'naf-rev2';
const QUERY_PARSER = {
	type: 'tokenized',
	params: { language: 'French', pattern: /[\w.]+/ },
};

async function fetchNaf() {
	return fetch('/naf-rev2.json').then((response) => response.json());
}

function prepareForIndex(naf) {
	return Object.values(naf).map(function (rubrique) {
		const { code } = rubrique;
		return { ...rubrique, id: code };
	});
}

export function CreateFillStore() {
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
		<>
			<StoreTools
				getNext={getNext}
				fields={FIELDS}
				storeName={STORE_NAME}
				queryParser={QUERY_PARSER}
				version="1"
			/>
		</>
	);
}

const story = {
	title: 'store-index/naf',
	component: StoreTools,
};

export default story;
