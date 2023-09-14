<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	enum SortDirectorion {
		None = 0,
		Asc = 1,
		Desc = 2
	}

	type ColumnType = 'img-link';

	interface IColumnState {
		type?: ColumnType;
		name: string;
		sort: SortDirectorion;
		order: number;
	}

	export let datasource: any[] = [];
	export let columnsSettings: { [key: string]: ColumnType } = {};

	let columns: IColumnState[] = [];

	onMount(() => {
		if (!datasource || datasource.length === 0) {
			return;
		}

		columns = Object.keys(datasource[0]).map((columnName) => ({
			type: columnsSettings[columnName] ?? undefined,
			name: columnName,
			sort: SortDirectorion.None,
			order: 0
		}));
	});

	function switchSortDirection(current: SortDirectorion): SortDirectorion {
		return current === SortDirectorion.Asc ? SortDirectorion.Desc : SortDirectorion.Asc;
	}

	function columnClick(clickedColumnData: IColumnState, event: MouseEvent): void {
		if (clickedColumnData.type === 'img-link') {
			return;
		}

		if (event.shiftKey) {
			columns = columns.map((column) =>
				column.name !== clickedColumnData.name
					? column
					: {
							...column,
							sort: switchSortDirection(column.sort),
							order:
								column.order !== 0
									? column.order
									: Math.max(...columns.map((column) => column.order)) + 1
					  }
			);
		} else {
			columns = columns.map((column) =>
				clickedColumnData.name !== column.name
					? { ...column, order: 0, sort: SortDirectorion.None }
					: { ...column, sort: switchSortDirection(column.sort), order: 1 }
			);
		}

		const compear = (first: Record<string, any>, second: Record<string, any>) => {
			const sortColumns: Record<number, IColumnState> = columns.reduce((result: Record<number, IColumnState>, element: IColumnState): object => {
				if (element.order !== 0) {
					result[element.order] = element;
				}

				return result;
			}, {});

			for (let index = 1; index <= Object.keys(sortColumns).length; index++) {
				const element = sortColumns[index];

				const direction = element.sort === SortDirectorion.Asc ? 1 : -1;
				if (first[element.name] > second[element.name]) {
					return 1 * direction;
				} else if (first[element.name] < second[element.name]) {
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
				{#if column.sort === 1}🔺{:else if column.sort === 2}🔻{/if}
				{#if column.order > 1}<sup>{column.order}</sup>{/if}
			</th>
		{/each}
	</thead>
	<tbody>
		{#each datasource as datum}
			<tr transition:fade>
				{#each columns as column}
					<td>
						{#if column.type === 'img-link' }
							<img src={datum[column.name]} alt={datum['Name']} />
						{:else}
							{datum[column.name]}
						{/if}
					</td>
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

	th > sup {
		font-size: xx-small;
		padding: 0;
		margin-left: -0.5em;
	}

	td img {
		width: 3em;
	}
</style>
