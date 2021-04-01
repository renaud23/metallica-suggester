export const ON_CHANGE_SEARCH = 'lunatic-suggester/on-change_search';
export const onChangeSearch = (search) => ({
	type: ON_CHANGE_SEARCH,
	payload: { search },
});

export const ON_UPDATE_OPTIONS = 'lunatic-suggester/on-update-options';
export const onUpdateOptions = (options) => ({
	type: ON_UPDATE_OPTIONS,
	payload: { options },
});

export const ON_FOCUS = 'lunatic-suggester/on-focus';
export const onFocus = () => ({ type: ON_FOCUS });

export const ON_BLUR = 'lunatic-suggester/on-blur';
export const onBlur = () => ({ type: ON_BLUR });

export const ON_CLICK_OPTION = 'lunatic-suggester/on-click-option';
export const onClickOption = (index) => ({
	type: ON_CLICK_OPTION,
	payload: { index },
});
