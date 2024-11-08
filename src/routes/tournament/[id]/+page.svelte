<script lang="ts">
	import Fa from 'svelte-fa';
	import { faDiagramProject, faPencil, faRankingStar } from '@fortawesome/free-solid-svg-icons';
	import { PL } from 'country-flag-icons/string/3x2';
	import { pageTitle, tournamentDate, tournamentTempo, tournamentPlayersCount } from '$lib/stores';
    import type { Tournament } from '$lib/models/tournament.js';
	import type { Match } from '$lib/models/match.js';
	import TournamentBracket from '$lib/components/tournament_bracket.svelte';

	export let data;
    let tournament: Tournament = data.tournament;
	let matches: Match[] = [];

    pageTitle.set(tournament.name);
    tournamentDate.set(new Date(tournament.date));
    tournamentTempo.set(tournament.tempo);
    tournamentPlayersCount.set(tournament.players.length);

	let treeWalk = (node: Match) => {
		matches.push(node);

		for (const child of node.children)
			treeWalk(child);
	};

	tournament.matchHead.forEach((head) => treeWalk(head));
</script>

<div class="flex items-center gap-2 mb-2">
	<Fa icon={faDiagramProject} />
	<p class="text-2xl font-semibold">Drabinka</p>

	{#if data.user}
		<a href="{tournament._id}/edit" class="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded shadow px-4 py-2 text-white">
			<Fa icon={faPencil} />
			Edytuj
		</a>
	{/if}
</div>
<div class="overflow-scroll">
	{#if tournament}
		{#each tournament.matchHead as head}
			<TournamentBracket node={head} playersInTournament={tournament.players} />
		{/each}
	{/if}
</div>


<div class="flex items-center gap-2 mb-2 mt-2">
	<Fa icon={faRankingStar} />
	<p class="text-2xl font-semibold">Ranking</p>
</div>
<div class="border rounded shadow px-4 py-2 overflow-hidden">
	<table>
		<tr class="text-left border-b">
			<th>Lp.</th>
			<th class="w-full">Zawodnik</th>
			<th>Wygrane</th>
			<th class="whitespace-nowrap">Zdobyte punkty</th>
		</tr>
		{#each tournament.players ?? [] as player, i}
			<tr>
				<td class="text-slate-500">#{i + 1}</td>
				<td class="flex gap-2 items-center">
					<div class="w-6 rounded overflow-hidden">
						{@html PL}
					</div>
					{player.name}
				</td>
				<td
					>{matches
						.filter((match) => match.players.find((p) => p._id === player._id))
						.filter((match) => {
							let results = match.results.reduce((acc, num, idx) => {
								acc[idx % match.players.length] += num;
								return acc;
							}, Array(match.players.length).fill(0));

                            return results[match.players.findIndex((p) => p._id === player._id)] === Math.max(...results);
						}).length}</td
				>
				<td>{matches
						.filter((match) => match.players.find((p) => p._id === player._id))
						.map((match) => {
							let results = match.results.reduce((acc, num, idx) => {
								acc[idx % match.players.length] += num;
								return acc;
							}, Array(match.players.length).fill(0));

                            return results[match.players.findIndex((p) => p._id === player._id)];
						}).reduce((sum, a) => sum + a, 0)}</td>
			</tr>
		{/each}
	</table>
</div>

<style>
	td {
		@apply px-2 py-2;
	}

	th {
		@apply px-2 py-2;
	}

	table tr:nth-child(even) {
		@apply bg-slate-100;
	}
</style>
