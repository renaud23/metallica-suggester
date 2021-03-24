import createIndex from './create-index';
import MESSAGES from './create-store-messages';
import {
	openOrCreateDb,
	idbBulkInsert,
	CONSTANTES,
	clearDb,
} from '../../commons-idb';
import updateStoreInfo from './update-store-info';

async function fill(
	name,
	fields,
	queryParser,
	version,
	entities,
	log = (args) => console.log(args)
) {
	try {
		// création de l'index en mémoire.
		log({ message: MESSAGES.startCreateIndex });
		const index = await createIndex(fields, entities, log);
		log({ message: MESSAGES.createIndexDone });
		const db = await openOrCreateDb(name, version);
		// nettoyage des stores idb
		await clearDb(db, CONSTANTES.STORE_DATA_NAME);
		await clearDb(db, CONSTANTES.STORE_INFO_NAME);
		log({ message: MESSAGES.storeClear });
		log({ message: MESSAGES.startInsertBatch });
		// update info store
		await updateStoreInfo(db, { queryParser, name, version });
		// batch d'insertion
		await idbBulkInsert(db, CONSTANTES.STORE_DATA_NAME, function (args) {
			log(args);
		})(index);
		log({ message: MESSAGES.insertBatchDone });
		log({ message: MESSAGES.done });
		return 'success';
	} catch (exception) {
		log({ message: { ...MESSAGES.error, exception } });
	}
}

export default fill;
