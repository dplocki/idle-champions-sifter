<script lang="ts">
	import { onMount } from 'svelte';

	type SortDirectorion = 'None' | 'ASC' | 'DESC';

	interface IColumnState {
		name: string;
		sort: SortDirectorion;
	}

	export let datasource: any[] = [];
	let columns: IColumnState[] = [];

	onMount(() => {
		if (!datasource || datasource.length === 0) {
			return;
		}

		columns = Object.keys(datasource[0]).map((columnName) => ({
			name: columnName,
			sort: 'None'
		}));
	});

	function buildSort(columnName: string, sortDirectorion: SortDirectorion): void {
		const direction = sortDirectorion !== 'ASC' ? -1 : 1;
		const compear = (a: any, b: any) => {
			if (a[columnName] > b[columnName]) {
				return 1 * direction;
			} else if (a[columnName] < b[columnName]) {
				return -1 * direction;
			}

			return 0;
		};

		datasource = datasource.sort(compear);
		columns = columns.map((oryginalColumn: IColumnState) => {
			if (oryginalColumn.name === columnName) {
				return { ...oryginalColumn, sort: sortDirectorion };
			}

			return { ...oryginalColumn, sort: 'None' };
		});
	}

	function columnClick(column: IColumnState): void {
		if (column.sort === 'ASC') {
			buildSort(column.name, 'DESC');
			return;
		}

		buildSort(column.name, 'ASC');
	}
</script>

<table>
	<thead>
		{#each columns as column}
			<th on:click={() => columnClick(column)}>
				{column.name}
				{#if column.sort === 'ASC'}
					🔺
				{:else if column.sort === 'DESC'}
					🔻
				{/if}
			</th>
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

<style>
	/* Stylowanie tabeli */
	table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid #ccc;
		margin-bottom: 20px;
	}

	/* Stylowanie wierszy parzystych */
	tr:nth-child(even) {
		background-color: #f5f5f5;
	}

	/* Stylowanie wierszy nieparzystych */
	tr:nth-child(odd) {
		background-color: #ffffff;
	}

	/* Stylowanie komórek danych */
	td {
		padding: 8px;
		border: 1px solid #ccc;
	}

	/* Stylowanie komórek nagłówka */
	th {
		padding: 8px;
		background-color: #333;
		color: #fff;
		border: 1px solid #ccc;
	}
</style>
