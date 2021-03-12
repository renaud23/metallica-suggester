import React, { useEffect } from 'react';
import { StoreTools, fillStore } from '../store-index';

const NAF_FIELDS = [
	{ name: 'libelle', rules: [/[\w]+/], language: 'French', min: 3 },
	{ name: 'code' },
];
const STORE_NAME = 'naf-rev2';

async function fetchNaf() {
	return fetch('/naf-rev2.json').then((response) => response.json());
}

async function createNafStore() {
	const naf = await fetchNaf();
	await fillStore(STORE_NAME, NAF_FIELDS, Object.values(naf));
}

export function CreateFillStore() {
	useEffect(function () {
		createNafStore();
	}, []);
	return <StoreTools />;
}

const story = {
	title: 'store-index/StoreTools',
	component: StoreTools,
};

export default story;
