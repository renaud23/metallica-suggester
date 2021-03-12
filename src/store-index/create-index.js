import createEntityTokenizer from './create-tokenizer';

function merge(index, tokens, e) {
	return tokens.reduce(
		function (a, t) {
			if (t in a) {
				if (a[t].indexOf(e) === -1) {
					return { ...a, [t]: [...a[t], e] };
				}
				return a;
			}
			return { ...a, [t]: [e] };
		},
		{ ...index }
	);
}

function createIndex(fields, entities) {
	const tokenizer = createEntityTokenizer(fields);
	return entities.reduce(function (a, e) {
		const tokens = tokenizer(e);
		return merge(a, tokens, e);
	}, {});
}

export default createIndex;
