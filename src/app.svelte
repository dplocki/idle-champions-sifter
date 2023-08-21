<script lang="ts">
	import QueryTextBox from './components/QueryTextBox.svelte';
	import Table from './components/Table.svelte';

	export let database: any[];

	function newquery(event: Event) {
		console.log('newquery', event);
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
