<script lang="ts">
    import QueryTextBox from "./components/queryTextBox.svelte";

    let results: any[] = [];

    function newquery(event: Event) {
        console.log('newquery', event);
    }

</script>

<h1>Idle Champions Sifter</h1>

<QueryTextBox on:query={newquery} />

{#each results as result}
    <li>{ result }</li>
{/each}
