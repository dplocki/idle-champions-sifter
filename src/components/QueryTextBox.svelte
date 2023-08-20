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

<div class="input-container">
	<input type="text" bind:value={query} on:keypress={keypressed} />
    <button on:click={clearQuery}>Clear</button>
</div>

<style>
	/* Stylowanie kontenera */
	.input-container {
		display: flex;
		align-items: center;
	}

	/* Stylowanie pola tekstowego */
	.input-container input[type='text'] {
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		margin-right: 10px;
		font-size: 14px;
	}

	/* Stylowanie przycisku */
	.input-container button {
		padding: 8px 12px;
		background-color: #333;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		transition: background-color 0.3s ease;
	}

	.input-container button:hover {
		background-color: #555;
	}
</style>
