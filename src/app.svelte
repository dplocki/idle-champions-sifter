<script lang="ts">
	import QueryTextBox from './components/QueryTextBox.svelte';
	import Table from './components/Table.svelte';
	import { lexer } from './query.parser';

	export let database: any[];

	function newquery(event: CustomEvent<string>) {
		console.log('newquery', lexer(event.detail));
	}
</script>

<h1>Idle Champions Sifter</h1>

<QueryTextBox on:query={newquery} />

<Table datasource={database} />

<style>
	h1 {
		font-size: 24px;
		color: #333;
		margin-bottom: 10px;
	}
</style>
