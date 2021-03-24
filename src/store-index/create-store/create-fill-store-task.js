import CreateFillStoreWorker from './fill-store.worker';
import fillStore from './fill-store';

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

function withoutWorker(
	name,
	fields,
	queryParser,
	version,
	entities = [],
	log = () => null
) {
	function launch() {
		return Promise.resolve(
			fillStore(name, fields, queryParser, version, entities, log)
		);
	}

	return [launch, () => null];
}

function withWorker(
	name,
	fields,
	queryParser,
	version,
	entities = [],
	log = () => null
) {
	let start = false;
	const worker = new CreateFillStoreWorker();
	function launch() {
		start = true;
		return new Promise(function (resolve) {
			worker.postMessage({ name, fields, entities, version, queryParser });
			worker.addEventListener('message', function (e) {
				const { data } = e;
				if (data === 'success') {
					resolve(data);
				} else {
					log(data);
				}
			});
		});
	}

	function terminate() {
		if (start) {
			worker.terminate();
		}
	}

	return [launch, terminate];
}

function create(
	name,
	fields,
	queryParser,
	version,
	entities = [],
	log = () => null
) {
	if (isWorkerCompatible()) {
		return withWorker(name, fields, queryParser, version, entities, log);
	} else {
		return withoutWorker(name, fields, queryParser, version, entities, log);
	}
}

export default create;
