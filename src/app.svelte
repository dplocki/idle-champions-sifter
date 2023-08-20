<script lang="ts">
    import QueryTextBox from "./components/QueryTextBox.svelte";
	import Table from "./components/Table.svelte";

    let results: any[] = [];

    function newquery(event: Event) {
        console.log('newquery', event);
    }

</script>

<h1>Idle Champions Sifter</h1>

<QueryTextBox on:query={newquery} />

<Table datasource={results} />
