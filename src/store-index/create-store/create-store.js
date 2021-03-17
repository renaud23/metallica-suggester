import { openStorage } from '../../commons-idb';

export const ID_STORE_IDENTIFIER = 'idb-store/store-index';

async function create(name, fields = [], version) {
	const db = await openStorage(name, version);
	return { id: ID_STORE_IDENTIFIER, db, name, version, fields };
}

export default create;
