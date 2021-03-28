import { rest } from 'msw';

function extractParams([param, value, ...rest]) {
	if (param && value) {
		return { [param]: value, ...extractParams(rest) };
	}
	return {};
}

function parserSearch(search) {
	if (search) {
		const result = search.match(/[\w]+/g);
		return extractParams(result);
	}
	return {};
}

async function fetchCOG() {
	return fetch('/communes-2019.json').then((response) => response.json());
}

function prepareForIndex(cog) {
	return cog.map(function (commune, i) {
		const { com } = commune;
		return { ...commune, id: `${com}-${i}` };
	});
}

function makeLink(path, params, method = 'GET') {
	const href = Object.entries(params).reduce(function (a, [param, value], i) {
		if (i === 0) {
			return `${a}?${param}=${value}`;
		}
		return `${a}&${param}=${value}`;
	}, `${path}`);
	return { href, method };
}

function createPageResponse(entities, path, page, size) {
	const start = Math.min((page - 1) * size, entities.length - 1);
	const length = Math.min(size, entities.length - start);
	const data = entities.slice(start, start + length);
	const max = Math.ceil(entities.length / size);
	const percent = ((start + length) / entities.length) * 100;
	const previous =
		page > 0 ? makeLink(path, { size, page: page - 1 }) : undefined;
	const next =
		page <= max ? makeLink(path, { size, page: page + 1 }) : undefined;

	return {
		data,
		pagination: { length, page, percent },
		links: { next, previous },
	};
}

function createRootResponse(path, size = 300) {
	const first = makeLink(path, { size, page: 1 });
	return { links: { first } };
}

function mock(path) {
	let communes;
	fetchCOG().then(function (cog) {
		communes = Object.values(prepareForIndex(cog));
	});

	return rest.get(path, function (req, res, ctx) {
		if (communes) {
			const { url } = req;
			const { search } = url;
			const { page, size } = parserSearch(search);

			if (page && size) {
				return res(
					ctx.status(206),
					ctx.json(
						createPageResponse(communes, path, parseInt(page), parseInt(size))
					)
				);
			} else {
				return res(ctx.status(200), ctx.json(createRootResponse(path)));
			}
		} else {
			return res(
				ctx.status(404),
				ctx.json({
					error: 'not ready yet!',
				})
			);
		}
	});
}

export default mock;
