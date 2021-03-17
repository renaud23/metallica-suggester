import tokenizer from 'string-tokenizer';
import removeAccents from 'remove-accents';
import { openStorage } from '../commons-idb';
import { CONSTANTES } from '../commons-idb';
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

function tokenize(search) {
	const { string } = tokenizer()
		.input(removeAccents(`${search}`).toLowerCase())
		.tokens({ string: /[\w]+/ })
		.resolve();

	return Array.isArray(string) ? string : [string];
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

async function searching(search, storeName, version, max = 30) {
	try {
		const db = await getDb(storeName, version);
		const transaction = db.transaction(CONSTANTES.STORE_NAME, 'readonly');
		const store = transaction.objectStore(CONSTANTES.STORE_NAME);
		const index = store.index(CONSTANTES.STORE_INDEX_NAME);
		const tokens = tokenize(search);
		if (tokens && tokens.length) {
			const results = await Promise.all(
				tokens.map((token) => searchToken(token, index))
			);
			const suggestions = results.reduce(function (a, step, i) {
				return { ...a, [tokens[i]]: step };
			}, {});

			const resultat = score(suggestions, tokens, max);

			if (max && max < resultat.length) {
				return resultat.slice(0, max);
			}
			return resultat;
		}
		return [];
	} catch (e) {
		throw e;
	}
}

export default searching;
