import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Loop from '@material-ui/icons/Loop';
import { serverMock } from './common-tools';
import fetchCOG from './common-tools/fetch-cog';
import { storeCog, Loader } from './common-tools';
import { useStoreIndex } from '../store-index';

const { name } = storeCog;
const STORE = { ...storeCog, href: '/cog/communes' };

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
	title: 'store-index/cog',
	component: () => null,
	parameters: {
		msw: [serverMock('/cog/communes', fetchCOG)],
	},
};

export default story;
