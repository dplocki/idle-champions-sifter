<script lang="ts">
	import QueryTextBox from "./querytextbox.svelte";

    let results: any[] = [];
</script>

<h1>Idle Champions Sifter</h1>

<QueryTextBox />

{#each results as result}
    <li>{ result }</li>
{/each}
