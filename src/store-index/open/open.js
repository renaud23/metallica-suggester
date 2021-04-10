import { openOrCreateDb } from '../../commons-idb';

async function open(store, idbVersion) {
	const { name } = store;
	const db = await openOrCreateDb(name, idbVersion);

	return db;
}

export default open;
