import React, { useEffect, useState, useCallback } from 'react';
import { createAppendTask, clearData } from '../../../store-index';
import Progress from './progress';
import browsePages from '../browse-pages';

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
						clearData(db);
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

export default Loader;
