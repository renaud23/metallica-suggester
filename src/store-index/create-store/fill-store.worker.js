/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import fillStore from './fill-store';

self.onmessage = async function (e) {
	const { name, fields, entities, version } = e.data;
	const status = await fillStore(name, fields, entities, version);

	self.postMessage(status);
};

function empty() {}

export default empty;
