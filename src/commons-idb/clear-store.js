import CONSTANTES from './constantes';

/**
 *
 */
function clearStore(db) {
	new Promise(function (resolve) {
		const transaction = db.transaction(CONSTANTES.STORE_NAME, 'readwrite');

		transaction.oncomplete = function () {
			resolve(true);
		};
		const storeIndex = transaction.objectStore(CONSTANTES.STORE_NAME);
		storeIndex.clear();
	});
}

export default clearStore;
