import createIndex from './create-index';
import MESSAGES from './create-store-messages';
import {
	openOrCreateStorage,
	idbBulkInsert,
	CONSTANTES,
	clearDb,
} from '../commons-idb';

async function fill(
	name,
	fields,
	entities,
	log = (args) => console.log(args),
	version = 1
) {
	log({ message: MESSAGES.start });
	const index = await createIndex(fields, entities);
	log({ message: MESSAGES.indexCreated });
	const prepared = Object.entries(index).map(function ([id, suggestions]) {
		return { suggestions, id };
	});
	try {
		const db = await openOrCreateStorage(name, version);
		await clearDb(db);
		log({ message: MESSAGES.storeClear });
		await idbBulkInsert(db, CONSTANTES.STORE_NAME, function (args) {
			log(args);
		})(prepared);
		log({ message: MESSAGES.done });
		return 'success';
	} catch (e) {
		log({ error: e });
	}
}

export default fill;
