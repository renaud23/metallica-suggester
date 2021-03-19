import MESSAGES from './create-store-messages';
import { createTokenizer } from '../../commons-tokenizer';

function createIndex(
	fields,
	entities,
	log = (msg) => console.log(msg),
	soft = false
) {
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

export default createIndex;
