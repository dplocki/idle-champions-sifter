<script lang="ts">
    export let datasource: any[] = [];
</script>

<table>
    <thead>
    </thead>
    <tbody>
    {#each datasource as datum}
        <tr>
        {#each Object.values(datum) as value}
            <td>{value}</td>
        {/each}
        </tr>
    {/each}
    </tbody>
    <tfoot>
    </tfoot>
</table>
