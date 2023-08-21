export async function load({ fetch }) {
	return {
		database: await fetch('./database.json').then((response) => response.json()),
	};
}