import CreateFillStoreWorker from './fill-store.worker';
import fillStore from './fill-store';

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

function create(name, fields, entities = [], log = () => null, version) {
	if (isWorkerCompatible()) {
		return new Promise(function (resolve) {
			const worker = new CreateFillStoreWorker();
			worker.postMessage({ name, fields, entities, version });
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
		return Promise.resolve(fillStore(name, fields, entities, log, version));
	}
}

export default create;
