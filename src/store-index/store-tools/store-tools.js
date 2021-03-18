import React, { useEffect, useState, useCallback } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { fillStore, CREATE_STORE_MESSAGES } from '../create-store';
import Fab from '@material-ui/core/Fab';
import Loop from '@material-ui/icons/Loop';
import Box from '@material-ui/core/Box';

function Progress({ display, value = 0 }) {
	if (display) {
		return (
			<Box position="relative" display="inline-flex">
				<CircularProgress
					variant="determinate"
					value={value}
					color="secondary"
				/>
				<Box
					top={0}
					left={0}
					bottom={0}
					right={0}
					position="absolute"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Typography
						variant="caption"
						component="div"
						color="textSecondary"
					>{`${Math.round(value)}%`}</Typography>
				</Box>
			</Box>
		);
	}
	return null;
}

async function createStore(storeName, fields, entities, log) {
	await fillStore(storeName, fields, entities, log);
}

function StoreTools({ entities, storeName, fields }) {
	const [disabled, setDisabled] = useState(true);
	const [display, setDisplay] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(
		function () {
			if (entities && storeName && fields) {
				setDisabled(false);
			}
		},
		[entities, storeName, fields]
	);

	const follow = useCallback(function (args) {
		const { message, percent } = args;
		const { type } = message;
		console.log(message);
		switch (type) {
			case CREATE_STORE_MESSAGES.startCreateIndex.type:
			case CREATE_STORE_MESSAGES.createIndexDone.type:
			case CREATE_STORE_MESSAGES.startInsertBatch.type:
			case CREATE_STORE_MESSAGES.insertBatchDone.type:
			// case CREATE_STORE_MESSAGES.startCreateIndex.type:
			// 	setDisplay(true);
			// 	setProgress(0);
			// 	break;
			// case CREATE_STORE_MESSAGES.bulkInsertComplete.type:
			// 	setProgress(percent);
			// 	break;
			// case CREATE_STORE_MESSAGES.done.type:
			// 	break;
			default:
		}
	}, []);

	const load = useCallback(
		function () {
			async function go() {
				setDisabled(true);
				await createStore(storeName, fields, entities, follow);
				setDisabled(false);
			}
			go();
		},
		[storeName, fields, entities, follow]
	);

	return (
		<div className="store-tools">
			<Fab disabled={disabled} color="primary" aria-label="add" onClick={load}>
				<Loop />
			</Fab>
			<Progress display={display} value={progress} />
		</div>
	);
}

export default StoreTools;
