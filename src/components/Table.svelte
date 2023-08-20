<script lang="ts">
    export let datasource: any[] = [];
</script>

{#each datasource as datum}
    <li>{ datum }</li>
{/each}
