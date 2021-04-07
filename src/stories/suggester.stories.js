import React from 'react';
import Suggester from '../suggester-idb';
import {
	OptionCogRenderer,
	OptionNafRenderer,
	LoremParagraph,
} from './common-tools';
import './custom-option.scss';

export function DefaultSuggesterWithNafRev2() {
	return (
		<>
			<Suggester
				storeName="naf-rev2"
				version="1"
				optionRenderer={OptionNafRenderer}
			/>
			<LoremParagraph />
		</>
	);
}

export function DefaultSuggesterWithCOG() {
	return (
		<>
			<Suggester
				storeName="cog"
				version="1"
				optionRenderer={OptionCogRenderer}
			/>
			<LoremParagraph />
		</>
	);
}

const story = {
	title: 'Suggester',
	component: Suggester,
};

export default story;
