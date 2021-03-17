import { BULK_INSERT_MESSAGES } from '../../commons-idb';

const MESSAGES = {
	...BULK_INSERT_MESSAGES,
	start: { type: 'fill-store/start' },
	indexCreated: { type: 'fill-store/index-created' },
	storeClear: { type: 'fill-store/clear-store' },
	done: { type: 'fill-store/done' },
	error: { type: 'fill-store/error' },
};

export default MESSAGES;
