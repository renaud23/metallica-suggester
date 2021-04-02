import React, { useContext } from 'react';

import { SuggesterContext } from '../../state-management';
import PanelContainer from './panel-container';
import OptionContainer from './option-container';

function getContent(options, OptionRender, selectedIndex, focused) {
	if (focused) {
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
	return undefined;
}

function Panel({ optionRenderer: OptionRender }) {
	const [state] = useContext(SuggesterContext);
	const { options, focused, selectedIndex } = state;
	const content = getContent(options, OptionRender, selectedIndex, focused);

	return <PanelContainer focused={focused}>{content}</PanelContainer>;
}

export default Panel;
