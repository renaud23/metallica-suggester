import { openOrCreateDb, CONSTANTES, clearDb } from '../../commons-idb';
import updateStoreInfo from './update-store-info';

async function create(name, version, queryParser) {
	try {
		const db = await openOrCreateDb(name, version);
		await clearDb(db, CONSTANTES.STORE_DATA_NAME);
		await clearDb(db, CONSTANTES.STORE_INFO_NAME);
		await updateStoreInfo(db, { queryParser, name, version });

		return db;
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export default create;
