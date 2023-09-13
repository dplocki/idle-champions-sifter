(function() {
	const table = document.getElementsByTagName('table')[0];
	const headers = Array.from(table.getElementsByTagName('th')).map(header => header.textContent.trim());
	const columnsCount = headers.length;

	return Array.from(table.querySelectorAll('tbody tr'))
		.map(row => {
			const cellsContent = Array.from(row.getElementsByTagName('td')).map(cell => {
				const image = cell.getElementsByTagName('img');

				if (image.length > 0) {
					return image[0].getAttribute('src');
				}

				const value = cell.textContent.trim();

				if (!isNaN(+value)) {
					return +value;
				}

				return value;
			});

			let datum = {};
			for(let index = 0; index < columnsCount; index++) {
				datum[headers[index]] = cellsContent[index];
			}

			return datum;
		})
		.map(datum => {
			delete datum.Unlocked;
			delete datum.Patrons;
			delete datum["Patrons w/ Feats"];
			return datum
		})
		.map(datum => {
			// Clean up the 'overwhelm' data
			const value = datum["Overwhelm (with feats)"];
			delete datum["Overwhelm (with feats)"]
			datum['Overwhelm'] =  typeof(value) === 'string' ? parseInt(value) : value;
			return datum;
		})
		.map(datum => {
			datum.Icon = datum.Icon.replace(/\.png.+$/, '.png');

			return Object.assign({'Icon': null, 'Name': null }, datum);
		})
		.map(datum => {
			datum['Alignment Good vs Bad'] = (datum['ALG-E'] === 'N')
				? 'Neutral'
				: ((datum['ALG-E'] === 'G')
				? 'Good'
				: 'Evil');

			delete datum['ALG-E'];

			datum['Alignment Law vs Chaotic'] = (datum['ALL-C'] === 'N')
				? 'Neutral'
				: ((datum['ALL-C'] === 'L')
				? 'Law'
				: 'Chaotic');

			delete datum['ALL-C'];

			return datum;
		});
})();
