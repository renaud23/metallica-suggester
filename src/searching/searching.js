import getDb from './get-db';
import { CONSTANTES } from '../commons-idb';
import searchInIndex from './search-in-index';
import resolveQueryParser from './resolve-query-parser';
import computeScore from './compute-score';

function prepare(response) {
	return response.map(({ suggestion }) => suggestion);
}

async function searchTokens(tokens, index) {
	const results = await Promise.all(
		tokens.map((token) => searchInIndex(token, index))
	);
	return results.reduce(function (a, step, i) {
		return { ...a, [tokens[i]]: step };
	}, {});
}

async function searching(search, name, version) {
	const max = 30;
	try {
		const db = await getDb(name, version);
		const parser = await resolveQueryParser(db, name);
		const transaction = db.transaction(CONSTANTES.STORE_DATA_NAME, 'readonly');
		const store = transaction.objectStore(CONSTANTES.STORE_DATA_NAME);
		const index = store.index(CONSTANTES.STORE_INDEX_NAME);
		const tokens = parser(search);
		if (tokens && tokens.length) {
			const tokensSuggestions = await searchTokens(tokens, index);
			const resultat = computeScore(tokensSuggestions);
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
