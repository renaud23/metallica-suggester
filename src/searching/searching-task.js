import CreateSearchWorker from './searching.worker';
import searching from './searching';

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

function create(searh, name, version) {
	if (isWorkerCompatible()) {
		return new Promise(function (resolve) {
			const worker = new CreateSearchWorker();
			worker.postMessage({ searh, name, version });
			worker.addEventListener('message', function (e) {
				const { data } = e;
				resolve(data);
			});
		});
	} else {
		return Promise.resolve(searching(searh, name, version));
	}
}

export default create;
