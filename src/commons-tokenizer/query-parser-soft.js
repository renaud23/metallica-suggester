import prepareStringIndexation from './prepare-string-indexation';

function parser(string) {
	return [prepareStringIndexation(string, '-')];
}

export default parser;
