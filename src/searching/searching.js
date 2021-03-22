import { openStorage } from '../commons-idb';
import { CONSTANTES, getEntity } from '../commons-idb';
import { queryParserTokenized, queryParserSoft } from '../commons-tokenizer';
import score from './compute-score';

let STORES = {};
let PARSERS = {};

async function getQueryParser(db, name) {
	if (name in PARSERS) {
		return PARSERS[name];
	}
	try {
		const info = await getEntity(db, CONSTANTES.STORE_INFO_NAME, name);
		const { queryParser } = info;
		const { type } = queryParser;
		switch (type) {
			case 'tokenized':
				PARSERS[name] = queryParserTokenized;
				const { params } = queryParser;
				const { language } = params;
				return (query) => queryParserTokenized(query, language);
			case 'soft':
				PARSERS[name] = queryParserSoft;
				return queryParserSoft;
			default:
				throw new Error(`Unknow parser type ${type}`);
		}
	} catch (e) {
		throw new Error(e);
	}
}

async function getDb(name, version) {
	if (name in STORES) {
		return STORES[name];
	}
	try {
		const store = await openStorage(name, version);

		STORES[name] = store;
		return store;
	} catch (e) {
		throw new Error(`Can't open store ${name} ${version}`);
	}
}

function searchToken(token, index) {
	const range = IDBKeyRange.bound(token, `${token}${CONSTANTES.MAX_STRING}`);
	return new Promise(function (resolve, reject) {
		try {
			index.getAll(range).onsuccess = function (req) {
				const results = req.target.result;
				resolve(results);
			};
		} catch (e) {
			reject(e);
		}
	});
}

function prepare(response) {
	return response.map(({ suggestion }) => suggestion);
}

async function searching(search, storeName, version) {
	const max = 30;
	try {
		const db = await getDb(storeName, version);
		const parser = await getQueryParser(db, storeName);
		const transaction = db.transaction(CONSTANTES.STORE_DATA_NAME, 'readonly');
		const store = transaction.objectStore(CONSTANTES.STORE_DATA_NAME);
		const index = store.index(CONSTANTES.STORE_INDEX_NAME);

		const tokens = parser(search);
		if (tokens && tokens.length) {
			const results = await Promise.all(
				tokens.map((token) => searchToken(token, index))
			);
			const suggestions = results.reduce(function (a, step, i) {
				return { ...a, [tokens[i]]: step };
			}, {});

			const resultat = score(suggestions, tokens, max);
			if (max && max < resultat.length) {
				return prepare(resultat.slice(0, max));
			}

			return prepare(resultat);
		}
		return [];
	} catch (e) {
		throw e;
	}
}

export default searching;
