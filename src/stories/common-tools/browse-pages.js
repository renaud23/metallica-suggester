async function browsePages(request, todo = async () => null, params) {
	const response = await fetch(request);
	const { status } = response;

	if (status === 200 || status === 206) {
		const body = await response.json();
		const { links, data, pagination } = body;
		const { first, next } = links;

		if (first) {
			const { href } = first;
			await browsePages(href, todo, params);
		} else if (next) {
			const { href } = next;
			await todo(data, pagination, params);
			await browsePages(href, todo, params);
		} else {
			await todo('Finished', params);
		}
	} else if (status === 404) {
		await todo('Finished', params);
	} else {
		throw new Error(`Error during browse ${request}`);
	}
}

export default browsePages;
