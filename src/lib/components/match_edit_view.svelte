<script lang="ts">
    import type { Match } from "$lib/models/match";
    import type { Player } from "$lib/models/player";

	export let leftBinding: 'straight' | undefined = undefined;
	export let rightBinding: 'up' | 'down' | 'straight' | undefined = undefined;
	export let playersInTournament: Player[] = [];
	export let match: Match | undefined;
	$: results = match?.results ?? [];
	$: players = match?.players ?? [];

	$: roundsPerPlayer = Math.ceil(results.length / players.length);

    let leftClasses = '';
    if (leftBinding === 'straight') leftClasses = 'bottom-0 border-t';
    
    let rightClasses = '';
    if (rightBinding === 'down') rightClasses = 'bottom-0 border-t border-r';
    else if (rightBinding === 'up') rightClasses = 'top-0 border-b border-r'; 
    else if (rightBinding === 'straight') rightClasses = 'bottom-0 border-t';

    let playerChange = (e: Event & { currentTarget: EventTarget & HTMLSelectElement }, i: number) => {
        if (match === undefined) return;
        match.players[i] = playersInTournament[parseInt(e.currentTarget.value)];

        match = match;
    };

    let scoreChange = (e: Event & { currentTarget: EventTarget & HTMLInputElement }, i: number) => {
        if (match === undefined) return;
        match.results[i] = parseFloat(e.currentTarget.value);

        match = match;
    };

    let playerAdd = () => {
        if (match === undefined) return;

        let roundsCount = roundsPerPlayer;
        let previousPlayerCount = match.players.length;
        match.players  = [...match.players, playersInTournament[0]];
        
        for(let i = 0; i < roundsCount; i++) {
            match.results.splice(i * previousPlayerCount + previousPlayerCount + i, 0, 0);
        }

        match = match;
    };

    let roundAdd = () => {
        if (match === undefined) return;

        match.results = [...match.results, ...(new Array(match.players.length).fill(0))];

        match = match;
    };

    let playerRemove = (i: number) => {
        if (match === undefined || players.length === 1) return;

        let roundsCount = roundsPerPlayer;
        let previousPlayerCount = match.players.length;
        match.players.splice(i, 1);

        for(let k = 0; k < roundsCount; k++) {
            match.results.splice(k * previousPlayerCount + i - k, 1);
        }

        match = match;
    };

    let roundRemove = (i: number) => {
        if (match === undefined || roundsPerPlayer === 1) return;

        match.results.splice(i * match.players.length, match.players.length);

        match = match;
    };

    let matchDelete = () => {
        match = undefined;
    }
</script>


{#if match !== undefined}
    <div class="flex items-center justify-end relative w-full h-full py-1">
        {#if leftBinding}
            <div class="w-10" />
            <div class="absolute left-0 w-10 h-1/2 {leftClasses}" />
        {/if}
        <div class="divide-y px-4 py-2 w-72 border rounded shadow">
            <div class="flex justify-end">
                <button class="w-full text-left" on:click|preventDefault={() => matchDelete()}>
                    Usuń mecz
                </button>
                {#each {length: roundsPerPlayer} as _, i}
                    <button on:click|preventDefault={() => roundRemove(i)} class="w-10">U</button>
                {/each}
            </div>
            {#each match.players as player, i}
                <div class="flex gap-2 h-8 items-center">
                    <select class="border shadow rounded bg-white px-2 py-1 w-24 dark:bg-slate-800" on:change={(e) => playerChange(e, i)}>
                        {#each playersInTournament as p, k}
                            <option value={k} selected={p._id === player._id}>{p.name}</option>
                        {/each}
                    </select>
                    <!-- TODO: Replace with trash icon -->
                    <button on:click|preventDefault={() => playerRemove(i)}>U</button>
                    <div class="flex divide-x ml-auto">
                        {#each {length: roundsPerPlayer} as _, k}
                            <input type="number" class="w-10 text-center border rounded shadow dark:bg-slate-800" value={match.results[i + k * match.players.length]} on:change={(e) => scoreChange(e, i + k * (match?.players.length ?? 0))}>
                        {/each}
                    </div>
                </div>
            {/each}
            <button class="bg-blue-600 hover:bg-blue-700 rounded shadow px-2 py-1 text-white mt-1" on:click|preventDefault={() => playerAdd()}>Dodaj gracza</button>
            <button class="bg-blue-600 hover:bg-blue-700 rounded shadow px-2 py-1 text-white" on:click|preventDefault={() => roundAdd()}>Dodaj rundę</button>
        </div>
        {#if rightBinding}
            <div class="w-10"></div>
            <div class="absolute right-0 w-10 h-1/2 {rightClasses}" />
        {/if}
    </div>
{/if}