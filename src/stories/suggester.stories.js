import React from 'react';
import Suggester from '../suggester';

export function DefaultSuggester() {
	return <Suggester storeName="naf-rev2" />;
}

const story = {
	title: 'Suggester',
	component: Suggester,
};

export default story;
