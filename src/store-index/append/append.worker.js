/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import append from './append';

self.onmessage = async function (e) {
	function log(message) {
		self.postMessage(message);
	}
	const { name, version, fields, entities } = e.data;
	await append(name, version, fields, entities, log);
	self.postMessage('success');
};

function empty() {}

export default empty;
