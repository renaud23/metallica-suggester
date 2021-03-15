/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import fillStore from './fill-store';

self.onmessage = async function (e) {
	function log(message) {
		self.postMessage(message);
	}
	const { name, fields, entities, version } = e.data;
	await fillStore(name, fields, entities, log, version);

	self.postMessage('success');
};

function empty() {}

export default empty;
