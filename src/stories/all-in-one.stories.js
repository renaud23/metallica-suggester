import { serverMock } from './common-tools';
import React, { useEffect, useState, useCallback } from 'react';
import { createAppendTask, createStore } from '../store-index';
import { clearDb, CONSTANTES } from '../commons-idb';
import Fab from '@material-ui/core/Fab';
import Loop from '@material-ui/icons/Loop';
import Suggester from '../suggester';
import { Progress, storeCog } from './common-tools';

const { name, fields, queryParser } = storeCog;

async function browsePages(request, todo = async () => null) {
	const response = await fetch(request);
	const { status } = response;
	const body = await response.json();

	if (status === 200 || status === 206) {
		const { links, data, pagination } = body;
		const { first, next } = links;

		if (first) {
			const { href } = first;
			await browsePages(href, todo);
		} else if (next) {
			const { href } = next;
			await todo(data, pagination);
			await browsePages(href, todo);
		} else {
			await todo('Finished');
		}
	} else {
		throw new Error('Gloops');
	}
}

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
	const [start, setStart] = useState(false);
	const [abort, setAbort] = useState(undefined);
	const [progress, setProgress] = useState(0);
	const db = useCreateStore(name, '1', queryParser);

	const todo = useCallback(async function (results, pagination) {
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
					clearDb(db, CONSTANTES.STORE_DATA_NAME);
					await browsePages('/communes', todo);
				}
			}
			go();
		},
		[start, db, todo]
	);
	return (
		<>
			<Fab
				disabled={false}
				color="primary"
				aria-label="add"
				onClick={() => setStart(true)}
			>
				<Loop />
			</Fab>
			<Progress value={progress} display={true} />
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
