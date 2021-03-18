/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import searching from './searching';

self.onmessage = async function (e) {
	const { searh, storeName, version, language } = e.data;
	const result = await searching(searh, storeName, version, language);

	self.postMessage(result);
};

function empty() {}

export default empty;
