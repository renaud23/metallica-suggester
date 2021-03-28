function split(entities = [], size) {
	return entities.reduce(
		function (a, e) {
			const [current, ...rest] = a;
			if (current.length > size) {
				return [[e], current, ...rest];
			}
			return [[e, ...current], ...rest];
		},
		[[]]
	);
}

export default split;
