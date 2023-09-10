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
		order: number;
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
			sort: SortDirectorion.None,
			order: 0
		}));
	});

	function switchSortDirection(current: SortDirectorion): SortDirectorion {
		return current === SortDirectorion.Asc ? SortDirectorion.Desc : SortDirectorion.Asc;
	}

	function columnClick(clickedColumnData: IColumnState, event: MouseEvent): void {
		if (event.shiftKey) {
			const lastSortableColumn = Math.max(...columns.map(column => column.order));
			let tmp = sortColumns.find(column => column.name === clickedColumnData.name);
			if (tmp) {
				sortColumns = sortColumns.map(column => column !== tmp ? column : { ...tmp, sort: switchSortDirection(tmp.sort) });
			} else {
				sortColumns = [ ...sortColumns, { ...clickedColumnData, sort: switchSortDirection(clickedColumnData.sort), order: lastSortableColumn + 1 }];
			}
		} else {
			sortColumns = [{ ...clickedColumnData, sort: switchSortDirection(clickedColumnData.sort), order: 1 }]
		}

		columns = columns.map(column => {
			let tmp = sortColumns.find(s => s.name === column.name);
			if (!tmp) {
				return { ...column, sort: SortDirectorion.None, order: 0 };
			}

			return {
				...column,
				sort: tmp.sort,
				order: tmp.order
			};
		});

		const compear = (a: any, b: any) => {
			for (const element of columns) {
				if (element.order === 0) {
					continue;
				}

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
	}
</script>

<table>
	<thead>
		{#each columns as column}
			<th on:click={(event) => columnClick(column, event)}>
				{column.name}
				{#if column.sort === 1 }
					🔺{ column.order }
				{:else if column.sort === 2}
					🔻{ column.order }
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
		min-width: 10em;
		padding: 1em;
		background-color: #333;
		color: #fff;
		border: 1px solid #ccc;

		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
