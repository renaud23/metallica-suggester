import { rest } from 'msw';
import sizeOf from 'object-sizeof';
import fetchCOG from './fetch-cog';
import fetchProut from './fetch-naf-rev2';

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
		pagination: { length, page, max, percent },
		links: { next, previous },
	};
}

function createRootResponse(path, size = 300) {
	const first = makeLink(path, { size, page: 1 });
	return { links: { first } };
}

function createResolver(path) {
	return function (req, res, ctx, entities) {
		const { url } = req;
		const { search } = url;
		const { page, size } = parserSearch(search);
		if (page && size) {
			const responsePage = createPageResponse(
				entities,
				path,
				parseInt(page),
				parseInt(size)
			);
			const { pagination } = responsePage;
			const { max } = pagination;
			return res(
				ctx.status(206),
				ctx.set('Cache-Control', 'public'),
				ctx.set('Content-Range', `page ${page}/${max}`),
				ctx.set('Content-length', sizeOf(responsePage)),
				ctx.json(responsePage)
			);
		} else {
			return res(ctx.status(200), ctx.json(createRootResponse(path)));
		}
	};
}

function mock(path) {
	let communes, naf;
	fetchCOG().then(function (cog) {
		communes = cog;
	});

	fetchProut().then(function (r) {
		naf = r;
	});

	const communesResolver = createResolver('/communes', communes);
	const nafResolver = createResolver('/naf', naf);

	return rest.get(path, function (req, res, ctx) {
		if (path === '/communes' && communes) {
			return communesResolver(req, res, ctx, communes);
		} else if (path === '/naf-rev2' && naf) {
			return nafResolver(req, res, ctx, naf);
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
