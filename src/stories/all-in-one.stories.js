import React, { useEffect, useState } from 'react';
import { createStore } from '../store-index';
import Fab from '@material-ui/core/Fab';
import Loop from '@material-ui/icons/Loop';
import Suggester from '../suggester-idb';
import {
	storeCog,
	storeNaf,
	OptionCogRenderer,
	OptionNafRenderer,
	Loader,
} from './common-tools';
import { serverMock } from './common-tools';
import fetchCOG from './common-tools/fetch-cog';
import fetchNafRev2 from './common-tools/fetch-naf-rev2';
import './custom-themes.scss';

const STORES = [
	{ ...storeCog, href: 'https://test/cog/communes?page=1&size=1000' },
	{ ...storeNaf, href: 'https://test/naf-rev2?page=1&size=500' },
];

const { name: storeCogName } = storeCog;
const { name: storeNafName } = storeNaf;

function useCreateStores(stores = []) {
	const [dbs, setDbs] = useState(undefined);

	useEffect(
		function () {
			async function init() {
				const load = stores.map(async function (store) {
					return await createStore(store, '1');
				});
				setDbs(await Promise.all(load));
			}
			init();
		},
		[stores]
	);
	return dbs;
}

function CustomLabelCog({ option, search, placeholder }) {
	if (option) {
		const { com, libelle } = option;
		return `${libelle} - ${com}`;
	}
	return search || <span className="placeholder">{placeholder}</span>;
}

export function AllInOne() {
	const [disabled, setDisabled] = useState(true);
	const [start, setStart] = useState(false);
	const idbx = useCreateStores(STORES);

	useEffect(
		function () {
			if (idbx) {
				setDisabled(false);
			}
		},
		[idbx]
	);

	return (
		<>
			<Fab
				disabled={disabled}
				color="primary"
				aria-label="add"
				onClick={() => setStart(true)}
			>
				<Loop />
			</Fab>
			{!disabled
				? STORES.map(function (store, index) {
						const { name } = store;
						const db = idbx[index];
						return <Loader key={name} start={start} db={db} store={store} />;
				  })
				: null}
			{!disabled ? (
				<>
					<div>COG :</div>
					<label id="label-suggester-cog" htmlFor="suggest-communes">
						Label for Suggester COG
					</label>
					<Suggester
						id="suggest-communes"
						labelledBy="label-suggester-cog"
						className="custom-theme"
						storeName={storeCogName}
						version="1"
						optionRenderer={OptionCogRenderer}
						labelRenderer={CustomLabelCog}
						onChange={(...args) => console.log(args)}
						onSelect={(...args) => console.log(args)}
					/>
					<div>NAF-REV2 :</div>
					<Suggester
						className="custom-theme"
						storeName={storeNafName}
						version="1"
						optionRenderer={OptionNafRenderer}
						onChange={(...args) => console.log(args)}
						onSelect={(...args) => console.log(args)}
					/>
				</>
			) : (
				"Store en cours d'ouverture, ou de création..."
			)}
		</>
	);
}

const story = {
	title: 'suggester/all-in-one',
	component: Suggester,
	parameters: {
		msw: [
			serverMock('https://test/cog/communes', fetchCOG),
			serverMock('https://test/naf-rev2', fetchNafRev2),
		],
	},
};

export default story;
