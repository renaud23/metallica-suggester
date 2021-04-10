import { clearDb, CONSTANTES } from '../../commons-idb';

function clear(db) {
	clearDb(db, CONSTANTES.STORE_DATA_NAME);
}

export default clear;
