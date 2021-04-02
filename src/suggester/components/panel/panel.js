import React, { useContext } from 'react';
import classnames from 'classnames';
import { SuggesterContext } from '../../state-management';
import OptionContainer from './option-container';

function getContent(options, OptionRender, selectedIndex) {
	return options.map(function (option, index) {
		const { id } = option;
		const selected = selectedIndex === index;
		return (
			<OptionContainer key={id} index={index}>
				<OptionRender option={option} selected={selected} />
			</OptionContainer>
		);
	});
}

function Panel({ optionRenderer: OptionRender }) {
	const [state] = useContext(SuggesterContext);
	const { options, focused, selectedIndex } = state;
	const content = getContent(options, OptionRender, selectedIndex);
	if (focused) {
		return (
			<ul
				tabIndex="0"
				className={classnames('lunatic-suggester-panel')}
				role="listbox"
			>
				{content}
			</ul>
		);
	}
	return null;
}

export default Panel;
