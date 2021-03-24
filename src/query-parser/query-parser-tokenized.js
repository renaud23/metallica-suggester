import tokenizer from 'string-tokenizer';
import { filterStemmer, filterLength } from '../commons-tokenizer';

function toArray(tokens) {
	return Array.isArray(tokens) ? tokens : [tokens];
}

function parser(query, language = 'English', reg = /[\w]+/) {
	const pattern = { tokens: reg };
	const wath = tokenizer().input(query).tokens(pattern).resolve();
	console.log({ wath });
	const { tokens } = wath;
	return filterStemmer(filterLength(toArray(tokens)), language);
}

export default parser;
