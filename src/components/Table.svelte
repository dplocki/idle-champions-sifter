<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	enum SortDirectorion  {
		None = 0,
		Asc = 1,
		Desc = 2
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

	function switchSortDirection(current: SortDirectorion): SortDirectorion {
		return (current + 1) % 3 as SortDirectorion;
	}

	function columnClick(clickedColumnData: IColumnState, event: MouseEvent): void {
		if (event.shiftKey) {
			let tmp = sortColumns.find(c => c.name === clickedColumnData.name);
			if (tmp) {
				sortColumns = sortColumns.map(x => x !== tmp ? tmp! : { ...tmp, sort: switchSortDirection(tmp.sort) });
			} else {
				sortColumns = [ ...sortColumns, { ...clickedColumnData, sort: switchSortDirection(clickedColumnData.sort) }];
			}
		} else {
			sortColumns = [{ ...clickedColumnData, sort: switchSortDirection(clickedColumnData.sort) }]
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
				{#if column.sort === 1 }
					🔺
				{:else if column.sort === 2}
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
