import CreateSearchWorker from './searching.worker';
import searching from './searching';

let WORKER = undefined;

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

function create(searh, name, version) {
	if (isWorkerCompatible()) {
		return new Promise(function (resolve) {
			if (WORKER) {
				WORKER.terminate();
			}
			WORKER = new CreateSearchWorker();
			WORKER.postMessage({ searh, name, version });
			WORKER.addEventListener('message', function (e) {
				const { data } = e;
				resolve(data);
			});
		});
	} else {
		return Promise.resolve(searching(searh, name, version));
	}
}

export default create;
