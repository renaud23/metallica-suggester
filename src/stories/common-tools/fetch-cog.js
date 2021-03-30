async function fetchCOG() {
	const response = await fetch('/communes-2019.json');
	const cog = await response.json();
	return cog.map(function (commune, i) {
		const { com } = commune;
		return { ...commune, id: `${com}-${i}` };
	});
}

export default fetchCOG;
