<script lang="ts">
	import App from '../app.svelte';
	export let data: any;
</script>

<App database={data.database} />
