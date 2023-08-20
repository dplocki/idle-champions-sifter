<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let query: string = '';

    function clearQuery() {
        query = '';
    }

    function keypressed(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            dispatch('query', query);
        }
    }
</script>

<input type="text" bind:value={query} on:keypress={keypressed} /><button on:click={clearQuery}>Clear</button>