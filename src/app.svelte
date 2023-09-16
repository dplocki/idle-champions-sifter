<script lang="ts">
	import QueryTextBox from './components/QueryTextBox.svelte';
	import Table from './components/Table.svelte';
	import { lexer } from './query.parser';

	export let database: any[];

	function newquery(event: CustomEvent<string>) {
		console.log('newquery', lexer(event.detail));
	}

	const searchModifiers = ['books', 'philosophy']

	const handleSubmit = (selectedValue: string) => {
		console.log(selectedValue)
	}

	let options = ['Jorge Luis Borges', 'Voltaire', 'Oscar Wilde', 'Julio Cortazar', 'T.S. Eliot']
</script>

<h1>Idle Champions Sifter</h1>


<QueryTextBox {options} onSubmit={handleSubmit} />


<Table datasource={database} columnsSettings={{ 'Icon': 'img-link' }} />

<style>
	h1 {
		font-size: 24px;
		color: #333;
		margin-bottom: 10px;
	}
</style>
