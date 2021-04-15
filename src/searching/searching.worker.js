/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searching from './searching';

self.onmessage = function (e) {
	const { searh, name, version, max } = e.data;
	searching(searh, name, version, max).then(function (result) {
		self.postMessage(result);
	});
};

function empty() {}

export default empty;
