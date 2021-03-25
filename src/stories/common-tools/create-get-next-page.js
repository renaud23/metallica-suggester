function get(entities, size = 1000) {
	if (entities) {
		const max = entities.length;
		const lots = entities.reduce(
			function (a, e) {
				const [current, ...rest] = a;
				if (current.length > size) {
					return [[e], current, ...rest];
				}
				return [[e, ...current], ...rest];
			},
			[[]]
		);

		let current = 0;
		let done = 0;
		return function () {
			if (current < lots.length) {
				const next = lots[current++];
				done += next.length;
				return {
					entities: next,
					percent: (done / max) * 100,
				};
			}
			current = 0;
			done = 0;
			return undefined;
		};
	}

	return function () {};
}

export default get;
