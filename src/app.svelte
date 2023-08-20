<script lang="ts">
	import { onMount } from 'svelte';
	import QueryTextBox from './components/QueryTextBox.svelte';
	import Table from './components/Table.svelte';

	let results: any[] = [];

	function newquery(event: Event) {
		console.log('newquery', event);
	}

	onMount(async () => {
		results = await fetch('./database.json').then((response) => response.json());
	});
</script>

<h1>Idle Champions Sifter</h1>

<QueryTextBox on:query={newquery} />

<Table datasource={results} />

<style>
	h1 {
		font-size: 24px;
		color: #333;
		margin-bottom: 10px;
	}
</style>
