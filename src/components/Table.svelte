<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	enum SortDirectorion  {
		None = 'None',
		Asc = 'ASC',
		Desc = 'DESC'
	};

	interface IColumnState {
		name: string;
		sort: SortDirectorion;
	}

	export let datasource: any[] = [];
	let columns: IColumnState[] = [];
	let sortColumns: IColumnState[] = [];

	onMount(() => {
		if (!datasource || datasource.length === 0) {
			return;
		}

		columns = Object.keys(datasource[0]).map((columnName) => ({
			name: columnName,
			sort: SortDirectorion.None
		}));
	});

	function columnClick(column: IColumnState, event: MouseEvent): void {
		if (event.shiftKey) {
			let tmp = sortColumns.find(c => c.name === column.name);

			if (tmp) {
				let tmp2 = tmp as IColumnState;
				if (tmp2.sort === SortDirectorion.None) {
					sortColumns = sortColumns.map(x => x !== tmp2 ? tmp2 : { ...tmp2, sort: SortDirectorion.Asc });
				} else if (tmp.sort === SortDirectorion.Asc) {
					sortColumns = sortColumns.map(x => x !== tmp2 ? tmp2 : { ...tmp2, sort: SortDirectorion.Desc });
				} else {
					sortColumns = sortColumns.map(x => x !== tmp2 ? tmp2 : { ...tmp2, sort: SortDirectorion.None });
				}
			} else {
				if (column.sort === SortDirectorion.None) {
					sortColumns = [ ...sortColumns, { ...column, sort: SortDirectorion.Asc }]
				} else if (column.sort === SortDirectorion.Asc) {
					sortColumns = [ ...sortColumns, { ...column, sort: SortDirectorion.Desc }]
				} else {
					sortColumns = [ ...sortColumns, { ...column, sort: SortDirectorion.None }]
				}
			}
		} else {
			if (column.sort === SortDirectorion.None) {
				sortColumns = [{ ...column, sort: SortDirectorion.Asc }]
			} else if (column.sort === SortDirectorion.Asc) {
				sortColumns = [{ ...column, sort: SortDirectorion.Desc }]
			} else {
				sortColumns = [{ ...column, sort: SortDirectorion.None }]
			}
		}

		const compear = (a: any, b: any) => {
			for (const element of sortColumns) {
				const direction = element.sort === SortDirectorion.Asc ? 1 : -1;

				if (a[element.name] > b[element.name]) {
					return 1 * direction;
				} else if (a[element.name] < b[element.name]) {
					return -1 * direction;
				}
			}

			return 0;
		};

		datasource = datasource.sort(compear);
		columns = columns.map(c => {
			let tmp = sortColumns.find(s => s.name === c.name);
			if (!tmp) {
				return { ...c, sort: SortDirectorion.None };
			}

			return {
				...c,
				sort: tmp.sort
			};
		})
	}
</script>

<table>
	<thead>
		{#each columns as column}
			<th on:click={(event) => columnClick(column, event)}>
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
			<tr transition:fade>
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
