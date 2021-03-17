export const ON_CHANGE_SEARCH = 'luantic-suggester/on-change_search';
export const onChangeSearch = (search) => ({
	type: ON_CHANGE_SEARCH,
	payload: { search },
});
