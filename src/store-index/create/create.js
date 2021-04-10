import { openOrCreateDb, CONSTANTES, clearDb } from '../../commons-idb';
import updateStoreInfo from './update-store-info';

async function create(store, idbVersion) {
	const { name, queryParser, display, version } = store;
	try {
		const db = await openOrCreateDb(name, idbVersion);
		await clearDb(db, CONSTANTES.STORE_INFO_NAME);
		await updateStoreInfo(db, { queryParser, name, version, display });

		return db;
	} catch (e) {
		throw e;
	}
}

export default create;
