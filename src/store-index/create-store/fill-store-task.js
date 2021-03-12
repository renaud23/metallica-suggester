import CreateFillStoreWorker from './fill-store.worker';
import fillStore from './fill-store';

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

function create(name, fields, entities = [], version) {
	if (isWorkerCompatible()) {
		return new Promise(function (resolve) {
			const worker = new CreateFillStoreWorker();
			worker.postMessage({ name, fields, entities, version });
			worker.addEventListener('message', function (e) {
				const { data } = e;
				resolve(data);
			});
		});
	} else {
		return Promise.resolve(fillStore(name, fields, entities, version));
	}
}

export default create;
