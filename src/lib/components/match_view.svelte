<script lang="ts">
	import { PL } from 'country-flag-icons/string/3x2';
	import type { Player } from '$lib/models/player';
	import type { Match } from '$lib/models/match';

	export let leftBinding: 'straight' | undefined = undefined;
	export let rightBinding: 'up' | 'down' | 'straight' | undefined = undefined;
	export let playersInTournament: Player[] = [];
	export let match: Match;

	$: results = match.results;
	$: players = match.players;

	$: roundsPerPlayer = results.length / players.length;
	$: finalResults = results.reduce((acc, num, idx) => {
		acc[idx % players.length] += num;
		return acc;
	}, Array(players.length).fill(0));

	let leftClasses = '';
	if (leftBinding === 'straight') leftClasses = 'bottom-0 border-t';

	let rightClasses = '';
	if (rightBinding === 'down') rightClasses = 'bottom-0 border-t border-r';
	else if (rightBinding === 'up') rightClasses = 'top-0 border-b border-r';
	else if (rightBinding === 'straight') rightClasses = 'bottom-0 border-t';
</script>

<div class="flex items-center justify-end relative w-full h-full py-1">
	{#if leftBinding}
		<div class="w-10" />
		<div class="absolute left-0 w-10 h-1/2 {leftClasses}" />
	{/if}
	<div class="divide-y px-4 py-2 w-72 border rounded shadow">
		{#each players as player, i}
			<div class="flex gap-2 h-8 items-center">
				<p class="text-slate-500">
					#{playersInTournament.findIndex((p) => p._id === player._id) + 1}
				</p>
				<div class="w-6 rounded overflow-hidden">
					{@html PL}
				</div>
				<p
					class="whitespace-nowrap {Math.max(...finalResults) === finalResults[i]
						? 'font-bold'
						: ''}"
				>
					{player.name}
				</p>
				<div class="flex divide-x ml-auto">
					{#each { length: roundsPerPlayer } as _, k}
						<p
							class="w-7 text-center {Math.max(
								...results.slice(k * players.length, (k + 1) * players.length)
							) === results[i + k * players.length]
								? 'font-bold'
								: ''}"
						>
							{results[i + k * players.length]}
						</p>
					{/each}
					<p
						class="w-10 text-center {Math.max(...finalResults) === finalResults[i]
							? 'font-bold'
							: ''}"
					>
						{finalResults[i]}
					</p>
				</div>
			</div>
		{/each}
	</div>
	{#if rightBinding}
		<div class="w-10"></div>
		<div class="absolute right-0 w-10 h-1/2 {rightClasses}" />
	{/if}
</div>
