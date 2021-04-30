import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Loop from '@material-ui/icons/Loop';
import { serverMock } from './common-tools';
import fetchNafRev2 from './common-tools/fetch-naf-rev2';
import { storeNaf, Loader } from './common-tools';
import { useStoreIndex } from '../store-index';

const { name } = storeNaf;
const BASE_PATH = process.env.BASE_PATH || '';
const STORE = { ...storeNaf, version: '1', href: `${BASE_PATH}/naf-rev2` };

export function CreateFillStoreCog() {
	const [disabled, setDisabled] = useState(true);
	const [start, setStart] = useState(false);
	const db = useStoreIndex(STORE, '1');

	useEffect(
		function () {
			if (db) {
				setDisabled(false);
			}
		},
		[db]
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
			{start ? (
				<Loader key={name} start={start} db={db} store={STORE} />
			) : undefined}
		</>
	);
}

const story = {
	title: 'store-index/naf',
	component: () => null,
	parameters: {
		msw: [serverMock(`${BASE_PATH}/naf-rev2`, fetchNafRev2)],
	},
};

export default story;
