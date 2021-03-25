import { CONSTANTES } from '../../commons-idb';

function update(db, info) {
	return new Promise(function (resolve, reject) {
		try {
			const transaction = db.transaction(
				CONSTANTES.STORE_INFO_NAME,
				'readwrite'
			);
			const store = transaction.objectStore(CONSTANTES.STORE_INFO_NAME);
			const request = store.add(info);

			request.onsuccess = () => {
				resolve('success');
			};

			request.onerror = (e) => {
				reject(e);
			};
		} catch (e) {
			reject(e);
		}
	});
}

export default update;
