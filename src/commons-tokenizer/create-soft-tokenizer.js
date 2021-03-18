import prepareStringIndexation from './prepare-string-indexation';

function createSoftTokenizer(fields = []) {
	return function (entity) {
		return fields.reduce(function (tokens, field) {
			const { name } = field;
			const value = `${entity[name]}`;
			return [...tokens, prepareStringIndexation(value, '-')];
		}, []);
	};
}

export default createSoftTokenizer;
