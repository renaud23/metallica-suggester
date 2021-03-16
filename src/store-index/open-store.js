import { openStorage } from './commons-idb';

async function open(name) {
	try {
		const store = await openStorage(name);
		return store;
	} catch (e) {
		throw new Error(e);
	}
}

export default open;
