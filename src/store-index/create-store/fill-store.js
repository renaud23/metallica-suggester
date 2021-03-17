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
		log({ message: MESSAGES.start });
		const index = await createIndex(fields, entities);
		log({ message: MESSAGES.indexCreated });
		const prepared = Object.entries(index).map(function ([id, suggestions]) {
			return { suggestions, id };
		});
		const db = await openOrCreateStorage(name, version);
		await clearDb(db);
		log({ message: MESSAGES.storeClear });
		await idbBulkInsert(db, CONSTANTES.STORE_NAME, function (args) {
			log(args);
		})(prepared);
		log({ message: MESSAGES.done });
		return 'success';
	} catch (exception) {
		log({ message: { ...MESSAGES.error, exception } });
	}
}

export default fill;
