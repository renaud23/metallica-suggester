/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import searching from './searching';

self.onmessage = async function (e) {
	const { searh, name, version } = e.data;
	const result = await searching(searh, name, version);

	self.postMessage(result);
};

function empty() {}

export default empty;
