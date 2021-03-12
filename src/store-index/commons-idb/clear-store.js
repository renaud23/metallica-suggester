import CONSTANTES from './constantes';

/**
 *
 */
async function clearStore(db) {
	new Promise((resolve) => {
		const transaction = db.transaction(CONSTANTES.STORE_NAME, 'readwrite');

		transaction.oncomplete = () => {
			resolve(true);
		};
		const storeIndex = transaction.objectStore(CONSTANTES.STORE_NAME);
		storeIndex.clear();
	});
}

export default clearStore;
