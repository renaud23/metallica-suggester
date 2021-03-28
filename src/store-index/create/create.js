import { openOrCreateDb, CONSTANTES, clearDb } from '../../commons-idb';
import updateStoreInfo from './update-store-info';

async function create(name, idbVersion, queryParser, dataVersion) {
	try {
		const db = await openOrCreateDb(name, idbVersion);
		// await clearDb(db, CONSTANTES.STORE_DATA_NAME);
		await clearDb(db, CONSTANTES.STORE_INFO_NAME);
		await updateStoreInfo(db, { queryParser, name, dataVersion });

		return db;
	} catch (e) {
		throw e;
	}
}

export default create;
