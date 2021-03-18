import * as levenshtien from 'damerau-levenshtein';

function compute(results, tokens) {
	const nbTokens = tokens.length;
	if (nbTokens) {
		const distance = Object.entries(results).reduce(function (
			a,
			[token, entities]
		) {
			const next = entities.reduce(function (b, { id, suggestions }) {
				const lev = levenshtien(id, token);
				const step = suggestions.map((suggestion) => ({
					suggestion,
					token,
					id: suggestion.id,
					lev,
				}));
				return [...b, ...step];
			}, []);

			return [...a, ...next];
		},
		[]);

		const countEntities = distance.reduce(function (a, entry) {
			const { id, token, suggestion, lev } = entry;
			const { similarity } = lev;
			if (id in a) {
				return {
					...a,
					[id]: {
						suggestion,
						count: a[id].count + 1,
						similarity: { ...a[id].similarity, [token]: similarity },
					},
				};
			}
			return {
				...a,
				[id]: { suggestion, count: 1, similarity: { [token]: similarity } },
			};
		}, {});
		// console.log(distance);

		const scores = Object.values(countEntities).map(function ({
			suggestion,
			similarity,
			count,
		}) {
			const simiCoef = Object.values(similarity).reduce((a, b) => a * b, 1.0);
			const dist = count / nbTokens;
			return { suggestion, score: dist * simiCoef, similarity };
		});
		// console.log(scores);
		const sorted = scores.sort(function (a, b) {
			if (a.score < b.score) {
				return 1;
			}
			if (a.score > b.score) {
				return -1;
			}
			return 0;
		});

		return sorted;
	}
	return [];
}

export default compute;
