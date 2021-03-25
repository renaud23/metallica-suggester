import { openDb, idbBulkInsert, CONSTANTES } from '../../commons-idb';
import MESSAGES from '../store-messages';
import { createTokenizer } from '../../commons-tokenizer';

function prepareEntities(fields, entities, log) {
	const tokenizer = createTokenizer(fields);

	let done = 0;
	const size = 1000;
	const max = entities.length;

	return entities.map(function (suggestion) {
		const { id } = suggestion;
		if (id) {
			const tokens = tokenizer(suggestion);
			done++;
			if (done % size === 0 || done === max) {
				log({
					message: {
						...MESSAGES.indexBatch,
						max,
						done,
						percent: (done / max) * 100,
					},
				});
			}
			return { id, suggestion, tokens };
		} else throw new Error(`Missing id on entity.`);
	}, []);
}

async function append(name, version, fields, entities, log = () => null) {
	const prepared = prepareEntities(fields, entities, log);
	const db = await openDb(name, version);
	log({ message: MESSAGES.startInsertBatch });
	await idbBulkInsert(db, CONSTANTES.STORE_DATA_NAME, function (args) {
		log(args);
	})(prepared);
	log({ message: MESSAGES.insertBatchDone });
	log({ message: MESSAGES.done });
	return 'success';
}

export default append;
