async function browsePages(request, todo = async () => null) {
	const response = await fetch(request);
	const { status } = response;
	const body = await response.json();

	if (status === 200 || status === 206) {
		const { links, data, pagination } = body;
		const { first, next } = links;

		if (first) {
			const { href } = first;
			await browsePages(href, todo);
		} else if (next) {
			const { href } = next;
			await todo(data, pagination);
			await browsePages(href, todo);
		} else {
			await todo('Finished');
		}
	} else {
		throw new Error(`Error during browse ${request}`);
	}
}

export default browsePages;
