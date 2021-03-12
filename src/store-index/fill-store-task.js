import CreateFillStoreWorker from './fill-store.worker';
import fillStore from './fill-store';

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

function create(name, fields, entities = []) {
	return new Promise(function (resolve) {
		if (isWorkerCompatible()) {
			const worker = new CreateFillStoreWorker();
			worker.postMessage({ name, fields, entities });
			worker.addEventListener('message', function (e) {
				const { data } = e;
				resolve(data);
			});
		} else {
			return Promise.resolve(fillStore(name, fields, entities));
		}
	});
}

export default create;
