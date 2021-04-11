/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import append from './append';

self.onmessage = function (e) {
	function log(message) {
		self.postMessage(message);
	}
	const { name, version, fields, entities } = e.data;
	append(name, version, fields, entities, log).then(function () {
		self.postMessage('success');
	});
};

function empty() {}

export default empty;
