<script lang="ts">
	import QueryTextBox from './components/QueryTextBox.svelte';
	import Table from './components/Table.svelte';
	import { lexer } from './query.parser';

	export let database: any[];

	function capitalizeFirstLetter(value: string): string {
		return value.charAt(0).toUpperCase() + value.slice(1);
	}

	function transformColumnNameInto(value: string): string {
		return value.split(' ').map(capitalizeFirstLetter).join('');
	}

	function newquery(event: CustomEvent<string>) {
		console.log('newquery', lexer(event.detail));
	}
</script>

<h1>Idle Champions Sifter</h1>

<QueryTextBox columns={Object.keys(database[0]).map(transformColumnNameInto)} />

<Table datasource={database} columnsSettings={{ 'Icon': 'img-link' }} />

<style>
	h1 {
		font-size: 24px;
		color: #333;
		margin-bottom: 10px;
	}
</style>
