import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { createFillStore, CREATE_STORE_MESSAGES } from '../create-store';
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

function createStore(storeName, fields, queryParser, version, entities, log) {
	return createFillStore(
		storeName,
		fields,
		queryParser,
		version,
		entities,
		log
	);
}

function StoreTools({ entities, storeName, fields, queryParser, version }) {
	const [disabled, setDisabled] = useState(true);
	const [display, setDisplay] = useState(false);
	const [progress, setProgress] = useState(0);
	const [startLoding, setStartLoading] = useState(false);

	useEffect(
		function () {
			if (entities && storeName && fields) {
				setDisabled(false);
			}
		},
		[entities, storeName, fields]
	);

	const follow = useCallback(function (args) {
		const { message } = args;
		const { type, percent } = message;
		console.log(message);
		switch (type) {
			case CREATE_STORE_MESSAGES.startCreateIndex.type:
				setDisplay(true);
				setProgress(0);
				break;
			case CREATE_STORE_MESSAGES.indexBatch.type:
				setProgress(percent);
				break;
			case CREATE_STORE_MESSAGES.createIndexDone.type:
			case CREATE_STORE_MESSAGES.startInsertBatch.type:
				setProgress(0);
				break;
			case CREATE_STORE_MESSAGES.bulkInsertComplete.type:
				setProgress(percent);
				break;
			case CREATE_STORE_MESSAGES.insertBatchDone.type:
				break;
			default:
		}
	}, []);

	const load = useCallback(function () {
		setStartLoading(true);
	}, []);

	useEffect(
		function () {
			const [launch, terminate] = createStore(
				storeName,
				fields,
				queryParser,
				version,
				entities,
				follow
			);
			if (startLoding) {
				async function go() {
					setDisabled(true);
					await launch();
					setDisabled(false);
					setStartLoading(false);
				}
				go();
			}
			return function () {
				terminate();
			};
		},
		[storeName, fields, entities, queryParser, version, follow, startLoding]
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
const ALLOWED_LANGUAGES = ['French', 'English'];
const QUERY_PARSER_TYPES = ['tokenized', 'soft'];
StoreTools.propTypes = {
	storeName: PropTypes.string.isRequired,
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			rules: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
			language: PropTypes.oneOf(ALLOWED_LANGUAGES),
			min: PropTypes.number,
		})
	).isRequired,
	queryParser: PropTypes.shape({
		type: PropTypes.oneOf(QUERY_PARSER_TYPES),
		params: PropTypes.shape({ language: PropTypes.oneOf(ALLOWED_LANGUAGES) }),
	}),
	version: PropTypes.string.isRequired,
};

export default StoreTools;
