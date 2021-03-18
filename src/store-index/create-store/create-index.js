import MESSAGES from './create-store-messages';
import { createTokenizer, createSoftTokenizer } from '../../commons-tokenizer';

function mergeWithSideEffects(index, tokens, entity) {
	tokens.forEach(function (token) {
		if (token in index) {
			index[token].push(entity);
		} else {
			index[token] = [entity];
		}
	});
}

function createIndex(
	fields,
	entities,
	log = (msg) => console.log(msg),
	soft = false
) {
	const tokenizer = soft
		? createSoftTokenizer(fields)
		: createTokenizer(fields);

	let done = 0;
	const size = 1000;
	const max = entities.length;
	const index = {};
	entities.forEach(function (e) {
		const { id } = e;
		if (id) {
			const tokens = tokenizer(e);
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
			mergeWithSideEffects(index, tokens, e);
		} else throw new Error(`Missing id on entity.`);
	}, {});
	return index;
}

export default createIndex;
