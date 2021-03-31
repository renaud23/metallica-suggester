import React, { useEffect, useState, useCallback } from 'react';
import { createAppendTask, createStore } from '../store-index';
import { clearDb, CONSTANTES } from '../commons-idb';
import Fab from '@material-ui/core/Fab';
import Loop from '@material-ui/icons/Loop';
import Suggester from '../suggester';
import {
	Progress,
	storeCog,
	storeNaf,
	OptionCogRenderer,
	OptionNafRenderer,
	browsePages,
} from './common-tools';
import { serverMock } from './common-tools';
import fetchCOG from './common-tools/fetch-cog';
import fetchNafRev2 from './common-tools/fetch-naf-rev2';

const STORES = [
	{ ...storeCog, version: '1', href: '/cog/communes?page=1&size=1000' },
	{ ...storeNaf, version: '1', href: '/naf-rev2?page=1&size=500' },
];

const { name: storeCogName } = storeCog;
const { name: storeNafName } = storeNaf;

// function useCreateStore(name, version, queryParser) {
// 	const [db, setDb] = useState(undefined);

// 	useEffect(
// 		function () {
// 			async function doIt() {
// 				const _db = await createStore(name, version, queryParser);
// 				setDb(_db);
// 			}

// 			doIt();
// 		},
// 		[name, version, queryParser]
// 	);
// 	return db;
// }

function useCreateStores(stores = []) {
	const [dbs, setDbs] = useState(undefined);

	useEffect(
		function () {
			async function init() {
				const load = stores.map(async function ({
					name,
					version,
					queryParser,
				}) {
					return await createStore(name, version, queryParser);
				});
				setDbs(await Promise.all(load));
			}
			init();
		},
		[stores]
	);
	return dbs;
}

function Loader({ start, db, store }) {
	const [progress, setProgress] = useState(0);
	const [abort, setAbort] = useState(undefined);
	const { name } = store;

	const indexPage = useCallback(async function (results, pagination, store) {
		if (Array.isArray(results)) {
			const { percent } = pagination;
			const { name, fields } = store;
			const [start, _abort] = createAppendTask(
				name,
				'1',
				fields,
				({ message }) => null
			);
			setAbort(_abort);
			await start(results, function () {
				setProgress(percent);
				setAbort(undefined);
			});
		}
	}, []);

	useEffect(
		function () {
			async function go() {
				try {
					if (start) {
						clearDb(db, CONSTANTES.STORE_DATA_NAME);
						const { href } = store;
						await browsePages(href, indexPage, store);
					}
				} catch (e) {
					console.log(e);
				}
			}

			go();
		},
		[start, store, db, indexPage]
	);

	useEffect(
		function () {
			return function () {
				if (abort) {
					abort();
				}
			};
		},
		[abort]
	);

	return (
		<>
			<span style={{ position: 'absolute', top: 0 }}>{name}</span>
			<Progress value={progress} display={true} />
		</>
	);
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
			{idbx
				? STORES.map(function (store, index) {
						const { name } = store;
						const db = idbx[index];
						return <Loader key={name} start={start} db={db} store={store} />;
				  })
				: null}
			{idbx ? (
				<>
					<div>COG :</div>
					<Suggester
						storeName={storeCogName}
						version="1"
						optionRenderer={OptionCogRenderer}
						onChange={(...args) => console.log(args)}
						onSelect={(...args) => console.log(args)}
					/>
					<div>NAF-REV2 :</div>
					<Suggester
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
			serverMock('/cog/communes', fetchCOG),
			serverMock('/naf-rev2', fetchNafRev2),
		],
	},
};

export default story;
