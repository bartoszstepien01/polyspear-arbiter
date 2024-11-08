<script lang="ts">
    import MatchView from "./match_view.svelte";
    import MatchEditView from "./match_edit_view.svelte";
    import type { Player } from "$lib/models/player";
    import type { Match } from "$lib/models/match";

    export let node: Match;
    export let childIndex: number = -1;
    export let parentChildrenCount: number = -1;
    export let playersInTournament: Player[] = [];
    export let nested: boolean = false;
    export let edit: boolean = false;

    let rightBinding: 'straight' | 'down' | 'up' | undefined = undefined;

    $: {
        if (parentChildrenCount === 1) {
            rightBinding = 'straight';
        } else if (childIndex === 0) {
            rightBinding = 'down';
        } else if (childIndex === parentChildrenCount - 1) {
            rightBinding = 'up';
        } else if (parentChildrenCount > 0){
            rightBinding = 'straight';
        }
    }

    $: {
        node.children = node.children.filter((e) => e);
    }
</script>

{#if node.children.length === 0}
    <div class="one-level">
        {#key rightBinding}
            {#if edit}
                <MatchEditView rightBinding={rightBinding} playersInTournament={playersInTournament} bind:match={node} />
            {:else}
                <MatchView rightBinding={rightBinding} playersInTournament={playersInTournament} match={node} />
            {/if}
        {/key}
    </div>
{:else}
    <div class="tournament-container {nested ? 'tournament-container-inner' : ''}">
        <div>
            {#each node.children as child, i}
                <svelte:self bind:node={child} childIndex={i} parentChildrenCount={node.children.length} playersInTournament={playersInTournament} nested edit={edit} />
            {/each}
        </div>
        <div>
            {#if edit}
                <MatchEditView leftBinding="straight" rightBinding={rightBinding} playersInTournament={playersInTournament} bind:match={node} />
            {:else}
                <MatchView leftBinding="straight" rightBinding={rightBinding} playersInTournament={playersInTournament} match={node} />
            {/if}
        </div>
    </div>
{/if}

<style>
</style>