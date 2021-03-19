import CreateFillStoreWorker from './fill-store.worker';
import fillStore from './fill-store';

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
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
		return new Promise(function (resolve) {
			const worker = new CreateFillStoreWorker();
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
	} else {
		return Promise.resolve(
			fillStore(name, fields, queryParser, version, entities, log)
		);
	}
}

export default create;
