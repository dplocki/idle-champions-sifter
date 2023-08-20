<script lang="ts">
	import { onMount } from 'svelte';

	interface IColumnState {
		name: string;
		sort: 'None' | 'ASC' | 'DESC';
	}

	export let datasource: any[] = [];
	let columns: IColumnState[] = [];

	onMount(() => {
		columns = Object.keys(datasource[0]).map((columnName) => ({
			name: columnName,
			sort: 'None'
		}));
	});

	function columnClick(column: IColumnState) {
		const columnName = column.name;

		if (column.sort !== 'ASC') {
			datasource = datasource.sort((a: any, b: any) => {
				if (a[columnName] > b[columnName]) {
					return 1;
				} else if (a[columnName] < b[columnName]) {
					return -1;
				}

				return 0;
			});

			columns = columns.map((oryginalColumn: IColumnState) => {
				if (oryginalColumn.name === column.name) {
					return { ...oryginalColumn, sort: 'ASC' };
				}

				return { ...oryginalColumn, sort: 'None' };
			});
		} else {
			datasource = datasource.sort((a: any, b: any) => {
				if (a[columnName] < b[columnName]) {
					return 1;
				} else if (a[columnName] > b[columnName]) {
					return -1;
				}

				return 0;
			});

			columns = columns.map((oryginalColumn: IColumnState) => {
				if (oryginalColumn.name === column.name) {
					return { ...oryginalColumn, sort: 'DESC' };
				}

				return { ...oryginalColumn, sort: 'None' };
			});
		}
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
