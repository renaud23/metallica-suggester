import React from 'react';
import Suggester from '../suggester';
import './custom-option.scss';

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

function OptionRenderer({ option, active, index }) {
	const { libelle, code } = option;
	return (
		<div className="naf-option">
			<span className="code">{code}</span>
			<span className="libelle">{libelle}</span>
		</div>
	);
}

export function DefaultSuggesterWithNafRev2() {
	return (
		<>
			<Suggester
				storeName="naf-rev2"
				version="1"
				optionRenderer={OptionRenderer}
				language="French"
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
				optionRenderer={OptionRenderer}
				language="French"
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
