import tokenizer from 'string-tokenizer';
import filterStemmer from './filter-stemmer';
import filterLength from './filter-length';

function toArray(tokens) {
	return Array.isArray(tokens) ? tokens : [tokens];
}

function parser(query, language = 'English') {
	const pattern = { tokens: /[\w]+/ };
	const { tokens } = tokenizer().input(query).tokens(pattern).resolve();
	return filterStemmer(filterLength(toArray(tokens)), language);
}

export default parser;
