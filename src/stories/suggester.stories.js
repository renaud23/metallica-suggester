import React from 'react';
import Suggester from '../suggester';

function LoremParagraph() {
	return (
		<p style={{ display: 'block', width: 400 }}>
			Vestibulum lacinia tempor lacus. Donec dictum ut odio at efficitur.
			Suspendisse ligula ante, efficitur ut arcu quis, varius convallis dui.
			Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
			cubilia curae; Nunc rutrum purus elementum est semper, tincidunt tincidunt
			sapien aliquet. Integer dictum tellus et elit aliquam placerat.
		</p>
	);
}

export function DefaultSuggester() {
	return (
		<>
			<Suggester storeName="naf-rev2" version="1" />
			<LoremParagraph />
		</>
	);
}

const story = {
	title: 'Suggester',
	component: Suggester,
};

export default story;
