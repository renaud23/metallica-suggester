import createIndex from './create-index';
import MESSAGES from './create-store-messages';
import {
	openOrCreateStorage,
	idbBulkInsert,
	CONSTANTES,
	clearDb,
} from '../../commons-idb';

async function fill(
	name,
	fields,
	entities,
	log = (args) => console.log(args),
	version = 1
) {
	try {
		log({ message: MESSAGES.startCreateIndex });
		const index = await createIndex(fields, entities, log);
		log({ message: MESSAGES.createIndexDone });
		const prepared = Object.entries(index).map(function ([id, suggestions]) {
			return { suggestions, id };
		});
		const db = await openOrCreateStorage(name, version);
		await clearDb(db);
		log({ message: MESSAGES.storeClear });
		log({ message: MESSAGES.startInsertBatch });
		await idbBulkInsert(db, CONSTANTES.STORE_NAME, function (args) {
			log(args);
		})(prepared);
		log({ message: MESSAGES.insertBatchDone });
		log({ message: MESSAGES.done });
		return 'success';
	} catch (exception) {
		log({ message: { ...MESSAGES.error, exception } });
	}
}

export default fill;
