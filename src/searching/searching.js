import { openStorage } from '../commons-idb';
import { CONSTANTES } from '../commons-idb';
import { queryParserTokenized } from '../commons-tokenizer';
import score from './compute-score';

let STORES = {};

async function getDb(name, version) {
	if (name in STORES) {
		return STORES[name];
	}
	try {
		const store = await openStorage(name, version);
		STORES[name] = store;
		return store;
	} catch (e) {
		throw new Error(`Can't open store ${name} ${version}`, e);
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

async function searching(search, storeName, version, language) {
	const max = 30;
	try {
		const db = await getDb(storeName, version);
		const transaction = db.transaction(CONSTANTES.STORE_DATA_NAME, 'readonly');
		const store = transaction.objectStore(CONSTANTES.STORE_DATA_NAME);
		const index = store.index(CONSTANTES.STORE_INDEX_NAME);
		const tokens = queryParserTokenized(search, language);
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
