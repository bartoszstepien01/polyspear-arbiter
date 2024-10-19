<script lang="ts">
    import type { Match } from "$lib/types/match";
    import MatchComponent from "./match_component.svelte";

    export let match: Match;
    export let childIndex: number = -1;
    export let parentChildrenCount: number = -1;

    let rightBinding = undefined;
    if (parentChildrenCount === 1) {
        rightBinding = 'straight';
    } else if (childIndex === 0) {
        rightBinding = 'down';
    } else if (childIndex === parentChildrenCount - 1) {
        rightBinding = 'up';
    } else if (parentChildrenCount > 0){
        rightBinding = 'straight';
    }
</script>

{#if match.children.length === 0}
    <MatchComponent rightBinding={rightBinding} />
{:else}
    <div class="tournament-container">
        <div>
            {#each match.children as child, i}
                <svelte:self match={child} childIndex={i} parentChildrenCount={match.children.length} />
            {/each}
        </div>
        <div>
            <MatchComponent leftBinding="straight" rightBinding={rightBinding} />
        </div>
    </div>
{/if}