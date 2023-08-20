<script lang="ts">
	interface IColumnState {
		name: string;
		sort: 'None' | 'ASC' | 'DESC';
	}

	export let datasource: any[] = [];
	let columns: IColumnState[] = [];

	$: {
		if (datasource.length > 0) {
			columns = Object.keys(datasource[0]).map((columnName) => ({
				name: columnName,
				sort: 'None'
			}));
		}
	}

	function columnClick(column: IColumnState) {
		const columnName = column.name;

		datasource = datasource.sort((a: any, b: any) => {
			if (a[columnName] > b[columnName]) {
				return 1;
			} else if (a[columnName] < b[columnName]) {
				return -1;
			}

			return 0;
		});
	}
</script>

<table>
	<thead>
		{#each columns as column}
			<th on:click={() => columnClick(column)}>{column.name}</th>
		{/each}
	</thead>
	<tbody>
		{#each datasource as datum}
			<tr>
				{#each columns as column}
					<td>{datum[column.name]}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot />
</table>
