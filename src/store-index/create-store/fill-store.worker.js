/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import fillStore from './fill-store';

self.onmessage = async function (e) {
	function log(message) {
		self.postMessage(message);
	}
	const { name, fields, entities, version, queryParser } = e.data;
	await fillStore(name, fields, queryParser, version, entities, log);
	self.postMessage('success');
};

function empty() {}

export default empty;
