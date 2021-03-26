import React, { useEffect, useState, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import createAppendTask from '../append';
import { clearDb, CONSTANTES } from '../../commons-idb';
import create from '../create';
import Fab from '@material-ui/core/Fab';
import Loop from '@material-ui/icons/Loop';
import Box from '@material-ui/core/Box';
import './store-tools.scss';

function Messages({ last }) {
	const areaEl = useRef();
	const { current } = areaEl;
	useEffect(
		function () {
			if (last && current) {
				current.value += '\n' + JSON.stringify(last);
				current.scrollTop = current.scrollHeight;
			}
		},
		[last, current]
	);
	return <textarea disabled={true} className="log" ref={areaEl}></textarea>;
}

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

function StoreTools({ storeName, fields, queryParser, version, getNext }) {
	const [disabled, setDisabled] = useState(true);
	const [db, setDb] = useState(undefined);
	const [display, setDisplay] = useState(false);
	const [progress, setProgress] = useState(0);
	const [startLoading, setStartLoading] = useState(false);
	const [message, setMessage] = useState(undefined);

	useEffect(
		function () {
			let unmount = false;
			async function doIt() {
				const _db = await create(storeName, version, queryParser);
				setDb(_db);
				if (!unmount) {
					setDisabled(false);
				}
			}

			doIt();
			return function () {
				unmount = true;
			};
		},
		[storeName, version, queryParser]
	);

	useEffect(
		function () {
			let _abort = undefined;
			async function doIt() {
				if (startLoading) {
					setDisabled(true);
					setDisplay(true);
					setProgress(0);
					let current = getNext();
					clearDb(db, CONSTANTES.STORE_DATA_NAME);
					while (current !== undefined) {
						const { entities, percent } = current;
						const [start, abort] = createAppendTask(
							storeName,
							version,
							fields,
							({ message }) => setMessage(message)
						);
						_abort = abort;
						await start(entities);
						current = getNext();
						setProgress(percent);
					}
					_abort = undefined;
					setDisabled(false);
					setStartLoading(false);
				}
			}
			doIt();
			return function () {
				if (_abort) {
					_abort();
				}
			};
		},
		[startLoading, getNext, storeName, version, fields, db]
	);

	return (
		<div className="store-tools">
			<Fab
				disabled={disabled}
				color="primary"
				aria-label="add"
				onClick={() => setStartLoading(true)}
			>
				<Loop />
			</Fab>
			<Progress display={display} value={progress} />
			<Messages last={message} />
		</div>
	);
}

export default StoreTools;
