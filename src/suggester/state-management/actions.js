export const ON_CHANGE_SEARCH = 'luantic-suggester/on-change_search';
export const onChangeSearch = (search) => ({
	type: ON_CHANGE_SEARCH,
	payload: { search },
});

export const ON_UPDATE_OPTIONS = 'luantic-suggester/on-update-options';
export const onUpdateOptions = (options) => ({
	type: ON_UPDATE_OPTIONS,
	payload: { options },
});

export const ON_FOCUS = 'luantic-suggester/on-focus';
export const onFocus = () => ({ type: ON_FOCUS });

export const ON_BLUR = 'luantic-suggester/on-blur';
export const onBlur = () => ({ type: ON_BLUR });
