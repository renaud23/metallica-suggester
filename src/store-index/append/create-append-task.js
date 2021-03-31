import AppendWorker from './append.worker';
import append from './append';

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

function withoutWorker(name, version, fields, log) {
	async function launch(entities) {
		const result = await append(name, version, fields, entities, log);
		return Promise.resolve(result);
	}

	function terminate() {}

	return [launch, terminate];
}

function withWorker(name, version, fields, log) {
	const worker = new AppendWorker();
	let start = false;
	let stop = false;

	function launch(entities, post = () => null) {
		return new Promise(function (resolve) {
			start = true;
			worker.postMessage({ name, version, fields, entities });
			worker.addEventListener('message', function (e) {
				const { data } = e;
				if (data === 'success') {
					if (!stop) {
						post();
					}
					resolve(data);
				} else {
					log(data);
				}
			});
		});
	}

	function terminate() {
		if (start) {
			stop = true;
			worker.terminate();
		}
	}

	return [launch, terminate];
}

function task(name, version, fields, log = () => null) {
	if (isWorkerCompatible()) {
		return withWorker(name, version, fields, log);
	} else {
		return withoutWorker(name, version, fields, log);
	}
}

export default task;
