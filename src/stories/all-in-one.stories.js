import React, { useEffect, useState, useCallback } from 'react';
import { createAppendTask, createStore } from '../store-index';
import { clearDb, CONSTANTES } from '../commons-idb';
import Fab from '@material-ui/core/Fab';
import Loop from '@material-ui/icons/Loop';
import Suggester from '../suggester';
import {
	Progress,
	storeCog,
	OptionCogRenderer,
	browsePages,
} from './common-tools';
import { serverMock } from './common-tools';

const { name, fields, queryParser } = storeCog;

function useCreateStore(name, version, queryParser) {
	const [db, setDb] = useState(undefined);

	useEffect(
		function () {
			async function doIt() {
				const _db = await createStore(name, version, queryParser);
				setDb(_db);
			}

			doIt();
		},
		[name, version, queryParser]
	);
	return db;
}

export function AllInOne() {
	const [disabled, setDisabled] = useState(true);
	const [start, setStart] = useState(false);
	const [abort, setAbort] = useState(undefined);
	const [progress, setProgress] = useState(0);
	const db = useCreateStore(name, '1', queryParser);

	useEffect(
		function () {
			if (db) {
				setDisabled(false);
			}
		},
		[db]
	);

	const indexPage = useCallback(async function (results, pagination) {
		if (Array.isArray(results)) {
			const { percent } = pagination;
			const [start, _abort] = createAppendTask(
				name,
				'1',
				fields,
				({ message }) => console.log(message)
			);
			setAbort(_abort);
			await start(results);
			setProgress(percent);
			setAbort(undefined);
		}
	}, []);

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

	useEffect(
		function () {
			async function go() {
				if (start && db) {
					setDisabled(true);
					clearDb(db, CONSTANTES.STORE_DATA_NAME);
					await browsePages('/communes?page=1&size=4000', indexPage);
					setStart(false);
					setDisabled(false);
				}
			}
			go();
		},
		[start, db, indexPage]
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
			<Progress value={progress} display={true} />
			{db ? (
				<Suggester
					storeName="cog"
					version="1"
					optionRenderer={OptionCogRenderer}
				/>
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
		msw: [serverMock('/communes')],
	},
};

export default story;
