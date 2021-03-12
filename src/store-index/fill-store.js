import createIndex from './create-index';
import { openStorage, idbBulkInsert, CONSTANTES, clearDb } from './commons-idb';

async function fill(name, fields, entities, log = (args) => console.log(args)) {
	log({ message: 'fill-store/start' });
	const index = await createIndex(fields, entities);
	log({ message: 'fill-store/index-ready-to-store' });
	const prepared = Object.entries(index).map(function ([id, entity]) {
		return { ...entity, id };
	});
	try {
		const db = await openStorage(name);
		await clearDb(db);
		log({ message: 'fill-store/clear-store' });
		await idbBulkInsert(db, CONSTANTES.STORE_NAME, function (args) {
			log(args);
		})(prepared);
		log({ message: 'fill-store/done' });
		return 'success';
	} catch (e) {
		log({ error: e });
	}
}

export default fill;
