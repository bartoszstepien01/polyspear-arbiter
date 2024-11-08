<script lang="ts">
    import type { Match } from "$lib/models/match";

    export let node: Match[] = [];
    export let prefix: string = '';
</script>

{#each node as subnode}
    <option value={prefix + subnode.name}>{prefix}{subnode.name}</option>
    <svelte:self node={subnode.children} prefix={prefix + subnode.name + '>'} />
{/each}